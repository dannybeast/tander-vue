# Получение доступа

1. В СУМД получаем группу `vpn_port_dev`. Согласовывает [Беленикин Евгений](mailto:belenikin@magnit.ru).
1. Отправляем заявку в СД, [ШПС](https://myit.corp.tander.ru/ux/rest/share/OJSXG33VOJRWKSLEHVJVER2BIE2VMMCHGRITMSSBJ5EUMR22JRFFSVKEGZAVMS2CGUTHEZLTN52XEY3FKR4XAZJ5KNJEIJTUMVXGC3TUJFSD2MBQGAYDAMBQGAYDAMBQGAYDCJTDN5XHIZLYORKHS4DFHVBUCVCBJRHUOX2IJ5GUKJTQOJXXM2LEMVZFG33VOJRWKTTBNVST243SNU======)
    1. В поле *"Перечислите необходимые ресурсы для работы через VPN соединение (например: Портал, СДО, Почта и т. д.)"* указываем примерно:
        > Доступ к рабочему ПК Linux через Balabit по VNC и SSH через VPN
    1. В поле *"Дополнительная значимая информация"* можно ещё раз продублировать:
        > Доступ к рабочему ПК Linux через Balabit по VNC и SSH через VPN
    3. Когда заявку выполнят, присылают проброшенные порты к вашему ПК. Их соответственно 2 (1 для vnc и 1 для ssh)
1. **Важно!** У пользователя не должно быть других групп `vpn_*`, например `vpn_port`, (исключения: `vpn_pc`, `vpn_aw_web`) иначе возможен конфликт при выдаче прав.

# Настройка сервера на рабочей машине

## Настройка SSH-сервера на ubuntu

1. Установка ssh-сервера

    ```bash
    sudo apt-get install openssh-server
    ```

1. Проверка
    ```bash
    sudo ps axu | grep sshd
    sudo netstat -tlpn | grep sshd
    ```

1. С чужого ПК в локалке проверить доступность по SSH вашего ПК

1. Через VPN подключение осуществляется командой

    ```
    ssh -p ваш-порт-на-балабите ваш-пользователь@10.8.56.16
    ```
    например
    ```
    ssh -p 2226 user@10.8.56.16
    ```

1. Если ssh-сессия сбрасывается посреди процесса подключения, попробуйте

    ```
    ssh -vvv -p ваш-порт-на-балабите ваш-пользователь@10.8.56.16
    ```

Если всё заканчивается на строчках вида

    debug1: sending SSH2_MSG_KEXDH_INIT
    debug2: bits set: 1054/2048
    debug3: send packet: type 30
    debug1: expecting SSH2_MSG_KEXDH_REPLY

то необходимо писать на ДЗИ, чтобы пофиксили на балабите (например на Доценко Станислав Евгеньевич <docenko_se@magnit.ru>), и приложить к письму логи вывода ssh-клиента и ssh-сервера.

## Настройка VNC-сервера (Вариант 1: на ubuntu 16.04+)

1. Установка X11vnc

    ```
    sudo apt-get install x11vnc
    ```

1. Установка пароля для подключения

    ```
    sudo x11vnc -storepasswd "пароль" /etc/x11vnc.pass
    sudo chmod 0777 /etc/x11vnc.pass
    ```

1. Настройка сервиса автоматического запуска
    ```
    sudo nano /lib/systemd/system/x11vnc.service
    ```

        /lib/systemd/system/x11vnc.service
        [Unit]
        Description=Start x11vnc at startup.
        After=multi-user.target
        [Service]
        Type=simple
        User=<ИМЯ ПОЛЬЗОВАТЕЛЯ В СИСТЕМЕ ПОД КОТОРЫМ ЗАПУЩЕН СЕАНС>
        ExecStart=/usr/bin/x11vnc  -rfbauth /etc/x11vnc.pass -noxdamage -shared -dontdisconnect -many -noxfixes -display :1
        [Install]
        WantedBy=multi-user.target

    ```
    sudo systemctl daemon-reload
    sudo systemctl enable x11vnc.service
    sudo systemctl start x11vnc.service
    ```

## Настройка VNC-сервера (Вариант 2: xfce под ubuntu 18.04+ и tightvnc)

1. Ставим софт:

    ```
    sudo aptitude install tightvncserver xfce4 autocutsel socat
    ```

1. Генерируем пароль (сохранится в ~/.vnc/passwd):

    ```
    vncpasswd
    ```

1. Создаем `~/.vnc/xstartup` для запуска:


        #!/bin/sh
        unset SESSION_MANAGER
        unset DBUS_SESSION_BUS_ADDRESS
        xrdb $HOME/.Xresources
        export XKL_XMODMAP_DISABLE=1
        autocutsel -fork
        export LANG='ru_RU.UTF-8'
        export LC_ALL='ru_RU.UTF-8'
        xsetroot -solid grey
        vncconfig -iconic &
        startxfce4 &

1. Даем права:

    ```
    chmod +x ~/.vnc/xstartup
    ```

1. Создаем файл `/etc/init.d/vncserver` для староверов

        #!/bin/sh -e
        ### BEGIN INIT INFO
        # Provides:          vncserver
        # Required-Start:    networking
        # Required-Stop:    
        # Default-Start:     2 3 4 5
        # Default-Stop:      0 1 6
        ### END INIT INFO
        PATH="$PATH:/usr/X11R6/bin/"
        
        # The Username:Group that will run VNC
        export USER="your user"
        
        # The display that VNC will use
        DISPLAY="1"
        
        # Color depth (between 8 and 32)
        DEPTH="24"
        
        # The Desktop geometry to use.
        #GEOMETRY="<WIDTH>x<HEIGHT>"
        GEOMETRY="1600x900"
        
        # The name that the VNC Desktop will have.
        NAME="my-vnc-server"
        
        OPTIONS="-name ${NAME} -depth ${DEPTH} -geometry ${GEOMETRY} :${DISPLAY}"
        
        . /lib/lsb/init-functions
        
        case "$1" in
        start)
        log_action_begin_msg "Starting vncserver for user '${USER}' on localhost:${DISPLAY}"
        # вот тут очень важная штука: новая сессия (не текущего сеанса)
        # не может создаваться на 5900 без костылей, поэтому мы просто пробрасываем порт
        socat tcp-listen:5900,reuseaddr,fork tcp:localhost:5901 &
        su ${USER} -c "/usr/bin/vncserver ${OPTIONS}"
        ;;
        
        stop)
        log_action_begin_msg "Stoping vncserver for user '${USER}' on localhost:${DISPLAY}"
        killall socat
        su ${USER} -c "/usr/bin/vncserver -kill :${DISPLAY}"
        ;;
        
        restart)
        $0 stop
        $0 start
        ;;
        esac

1. Запускаем и радуемся жизни:

    ```
    sudo update-rc.d vncserver enable
    sudo /etc/init.d/vncserver start
    ```
    
## Настройка xRDP сервера на ubuntu (вариант с xfce4)

1. Ставим софт:

    ```
    sudo aptitude install xrdp xfce4 xfce4-terminal
    ```

1. Включаем сервис:

    ```
    sudo systemctl enable xrdp
    ```

1. Открываем rdp-порт:

    ```
    sudo ufw allow 3389/tcp 
    ```

1. Правим конфиг `/etc/xrdp/startwm.sh` для запуска xfce:


        #!/bin/sh
        # xrdp X session start script (c) 2015, 2017 mirabilos
        # published under The MirOS Licence
        
        if test -r /etc/profile; then
                . /etc/profile
        fi
        
        if test -r /etc/default/locale; then
                . /etc/default/locale
                test -z "${LANG+x}" || export LANG
                test -z "${LANGUAGE+x}" || export LANGUAGE
                test -z "${LC_ADDRESS+x}" || export LC_ADDRESS
                test -z "${LC_ALL+x}" || export LC_ALL
                test -z "${LC_COLLATE+x}" || export LC_COLLATE
                test -z "${LC_CTYPE+x}" || export LC_CTYPE
                test -z "${LC_IDENTIFICATION+x}" || export LC_IDENTIFICATION
                test -z "${LC_MEASUREMENT+x}" || export LC_MEASUREMENT
                test -z "${LC_MESSAGES+x}" || export LC_MESSAGES
                test -z "${LC_MONETARY+x}" || export LC_MONETARY
                test -z "${LC_NAME+x}" || export LC_NAME
                test -z "${LC_NUMERIC+x}" || export LC_NUMERIC
                test -z "${LC_PAPER+x}" || export LC_PAPER
                test -z "${LC_TELEPHONE+x}" || export LC_TELEPHONE
                test -z "${LC_TIME+x}" || export LC_TIME
                test -z "${LOCPATH+x}" || export LOCPATH
        fi
        
        if test -r /etc/profile; then
                . /etc/profile
        fi
        
        #test -x /etc/X11/Xsession && exec /etc/X11/Xsession
        #exec /bin/sh /etc/X11/Xsession
        
        startxfce4

1. Перезапускаем сервис:

    ```
    sudo service xrdp restart
    ```

# Настройка клиентов

1. адрес подключения vnc и ssh будет иметь вид `10.8.56.16:(порт)`
1. Порт для каждого пользователя свой, и начинается чаще всего на 59
1. адрес подключения rdp будет иметь ВАШ РЕАЛЬНЫЙ IP рабочего ПК

## Настройка доступа VNC с телефона

1. Устанавливаем `Cisco AnyConnect`
1. В настройках указываем шлюз gate.tander.ru
1. Устанавливаем VNC клиент, например, `VNC Viewer`
1. В настройках подключения указываем адрес и порт подключения

## Настройка доступа VNC с ПК (linux kde)

1. Устанавливаем софт:

    ```
    sudo apt-get install openconnect network-manager-openconnect network-manager-openvpn krdc remmina
1. Устанавливаем VPN соединение:
    - В настройках сетевых соединений добавляем новое vpn соединение с типом `Cisco AnyConnect`. Указываем шлюз gate.tander.ru
    - либо из консоли запускаем

        ```
        sudo openconnect gate.tander.ru
        ```
1. Если не хочется использовать Cisco AnyConnect, то можно воспользоваться FortiVPN:
    - ставим пакеты openfortivpn и libqt5keychain1
    - скачиваем клиента https://hadler.me/linux/openfortigui/
    - в настройках прописать:
        - адрес: fgate.tander.ru
        - порт: 443
        - логин: corp\логин
        - trusted-cert: `4121e7e1406bdeacd5f9935577243d53df93a27c4cbf20c0110634cfdc5669cb`
        - включить галку certificate
        
![настройки 1](forti_settings_1.png)

![настройки 2](forti_settings_2.png)

![логин](forti_login.png)

![основное окно](forti_connect.png)
    

1. В настройках подключения VNC-клиента (например, `krdc` / `remmina`) указываем адрес и порт подключения

## Настройка к v00linux-sh01

1. Должны быть доменные группы `T-APP_Linux_users`, `T-APP_1C_Terminal`
1. Необходимо указать шлюз RG при RDP-соединении, например, для `remmina`:
    1. сервер `v00linux-sh01.corp.tander.ru`
    1. имя/пароль пользователя — доменная УЗ без `corp/`
    1. домен `corp`
    1. сервер шлюза RD `rdg.corp.tander.ru`
    1. имя/пароль пользователя шлюза RD — доменная УЗ без `corp/`
    1. домен шлюза RD `corp`
    
## Настройка доступов к почте и Riot

1. Прописать в `/etc/hosts`:
    ```
    193.19.170.196  im.magnit.ru
    10.8.151.148 owa.magnit.ru # если почта недоступа по днс
    10.8.53.109 mail.magnit.ru # если почта недоступа по днс
    ```

1. Почта доступна https://owa.magnit.ru/owa/ (вложения нельзя скачать) и https://mail.magnit.ru (вложения можно скачать)
1. Riot доступен на https://riot.im/app/, если в настройках указать сервер im.magnit.ru