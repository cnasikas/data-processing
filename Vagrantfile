# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/bionic64"
  # config.ssh.pty = true

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  config.vm.synced_folder ".", "/data_sharing"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt install -y make
    sudo apt install -y cmake
    sudo apt install -y g++
    sudo apt install -y mysql-server
    sudo apt install zsh
    sudo apt install git
    wget -qO- https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt install -y nodejs
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ rc main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update && sudo apt-get install yarn
    sudo npm install -g truffle
    sudo npm install -g ganache-cli
    sudo npm install -g pm2
  SHELL

  config.vm.provision "shell", inline: <<-SHELL
    echo "[*] Preparing local folders..."
    mkdir /data_sharing_node_modules_main
    chown vagrant:vagrant /data_sharing_node_modules_main

    mkdir /data_sharing_node_modules_api
    chown vagrant:vagrant /data_sharing_node_modules_api

    mkdir /data_sharing_node_modules_dapp
    chown vagrant:vagrant /data_sharing_node_modules_dapp

    mkdir /data_sharing_node_modules_explorer
    chown vagrant:vagrant /data_sharing_node_modules_explorer

    mkdir /data_sharing_node_modules_controller
    chown vagrant:vagrant /data_sharing_node_modules_controller

    mkdir /data_sharing_node_modules_processor
    chown vagrant:vagrant /data_sharing_node_modules_processor

    mkdir /data_sharing_node_modules_lib_blockchain
    chown vagrant:vagrant /data_sharing_node_modules_lib_blockchain

    mkdir /data_sharing_node_modules_lib_dataset_manager
    chown vagrant:vagrant /data_sharing_node_modules_lib_dataset_manager

    mkdir /data_sharing_node_modules_lib_db
    chown vagrant:vagrant /data_sharing_node_modules_lib_db

    mkdir /data_sharing_node_modules_lib_total_crypto
    chown vagrant:vagrant /data_sharing_node_modules_lib_total_crypto

    mkdir /data_sharing_node_modules_lib_util
    chown vagrant:vagrant /data_sharing_node_modules_lib_util

    mkdir /pequin
    chown vagrant:vagrant /pequin
    echo "[*] Done!"
  SHELL

  config.vm.provision "shell", run: "always", inline: <<-SHELL
    echo "[*] Mounting local folders..."
    mount --bind /data_sharing_node_modules_main /data_sharing/node_modules
    mount --bind /data_sharing_node_modules_api /data_sharing/api/node_modules
    mount --bind /data_sharing_node_modules_dapp /data_sharing/dapp/node_modules
    mount --bind /data_sharing_node_modules_explorer /data_sharing/explorer/node_modules
    mount --bind /data_sharing_node_modules_controller /data_sharing/controller/node_modules
    mount --bind /data_sharing_node_modules_processor /data_sharing/processor/node_modules
    mount --bind /data_sharing_node_modules_lib_blockchain /data_sharing/api/node_modules
    mount --bind /data_sharing_node_modules_lib_dataset_manager /data_sharing/lib/dataset-manager/node_modules
    mount --bind /data_sharing_node_modules_lib_db /data_sharing/lib/db/node_modules
    mount --bind /data_sharing_node_modules_lib_total_crypto /data_sharing/lib/total-crypto/node_modules
    mount --bind /data_sharing_node_modules_lib_util /data_sharing/lib/util/node_modules
    mount --bind /pequin /data_sharing/zkp/pequin
    echo "[*] Done!"
  SHELL

  config.vm.provision "shell", inline: <<-SHELL
    echo "[*] Installing app..."
    cd /data_sharing

    ./install.sh
    ./link_libraries.sh

    yarn compile

    ./build.sh

    cd /data_sharing/zkp/pequin
    sudo install_debian_ubuntu.sh
    echo "[*] Done!"
  SHELL

  config.vm.provision "shell", run: "always", privileged: false, inline: <<-SHELL
    echo "[*] Starting ganache-cli..."
    pm2 start ganache-cli -- -a 10 -d -p 7545 -l 100000000 -i 5777
    echo "[*] Done!"
  SHELL

  config.vm.provision "shell", run: "always", privileged: false, inline: <<-SHELL
    echo "[*] Deploying contracts..."
    cd /data_sharing/lib/blockchain/contracts
    rm -rf build
    truffle networks --clean
    truffle migrate --reset
    echo "[*] Done!"
  SHELL

  config.vm.provision "shell", run: "always", privileged: false, inline: <<-SHELL
    echo "[*] Starting nodes..."
    cd /data_sharing
    pm2 start
    echo "[*] Done!"
  SHELL

end
