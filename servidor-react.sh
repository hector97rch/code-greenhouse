#bin/bash
#login root
sudo su
Cordage12345
#upgrade system
apt-get update
apt-get upgrade -y
#install node and npm
sudo apt install nodejs
sudo apt install npm
sudo npm install -g npm@latest
#check versions
npm -v
node -v
nodejs -v

sleep 10s
#instalacion de asdf
sudo apt install curl git
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.1
. $HOME/.asdf/asdf.sh
. $HOME/.asdf/completions/asdf.bash
apt-get install dirmngr gpg curl gawk
#asdf modulo nodejs
asdf install nodejs 14.17.0
asdf global nodejs 14.17.0
#install react
sudo npm install -g create-react-app
#instalando proyecto
cd greenhouse-react
cd ahorcado
npm install
npm i boostrap
npm i reactstrap
npm i axios
npm i react-icons --save
npm i react-router-dom 
