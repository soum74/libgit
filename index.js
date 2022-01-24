Bonjour comment va tu ?

---

- name: "Install PHP"
  hosts: ["front"]
  gather_facts: no
  handlers:
   - name: 
     service: 
      name: "httpd"
      enabled: yes
      state: restarted 
  tasks: 
   - rpm_key:
      state: present
      key: "http://rpms.remirepo.net/RPM-GPG-KEY-remi2018"
   - name: "Insatll EPEL"
     package:
      name: "epel-release"
      state: present
     notify: "Restart Apache"

   - name: "Install remi repo"
     package: 
      name: "https://rpms.remirepo.net/entreprise/remi-release-8.rpm"
      state: latest
     notify: "Restart Apache"
   - name: "Install PHP 8 from remi repo"
     package:
      name: "php, php,php-gd,php-mysqlnd"
      enablerepo: "remi-php73"
      state: present
     notify: "Restart Apache"

   - name: "Install Apache"
     package:
      name: "httpd"
      state: present

   - name: "Start Apache"
     service:
      name: "httpd"
      enabled: yes
      state: started
