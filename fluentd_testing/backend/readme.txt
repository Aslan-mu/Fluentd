*****important files location for gcp vm: 
fluent-testing :
	backend: /usr/games/backend
	error log: /var/log/td-agent/td-agent.log
	conf: /etc/td-agent/td-agent.conf



*****some commands for fluentd service 
$ sudo /etc/init.d/td-agent restart
$ sudo /etc/init.d/td-agent status
$ sudo systemctl start td-agent.service
$ sudo systemctl status td-agent.service



*****one fixed bug: Fluentd gives the error: Log file is not writable, when starting the server
https://stackoverflow.com/questions/35123483/fluentd-gives-the-error-log-file-is-not-writable-when-starting-the-server
If you installed td-agent v2, it creates its own user and group called td-agent. I believe that when you run the td-agent service, it switches to this user and hence it expects the directory to have write permissions for this user. I faced the same issue and did something like: (Use sudo if needed for below commands.)

mkdir /logs
chown td-agent:td-agent /logs
and update your section to:

<match whatever.access>
  @type file
  path /logs/what.txt
</match>




<source>
  @type forward
  port 24224
  bind 0.0.0.0
  body_size_limit 32m
  keepalive_timeout 10s
</source>

<match fluentd.test.**>
  @type stdout
</match>


*****set up firewall(port for external IP)
open port 24224: apply firewall rules to vm instance:
fluentd-server-port
Ingress
fluentd
IP ranges: 0.0.0.0/0
tcp:24224
Allow
1000



***** necessary depedencies for installing fluentd plugin in
install gems to install gcp-fluentd output plugin
sudo apt-get install rubygems
sudo apt-get install ruby-all-dev
gem install fluent-plugin-google-cloud