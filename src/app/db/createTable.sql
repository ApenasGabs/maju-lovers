create table users(
    idUser int not null primary key auto_increment,
    nome varchar(30) not null,
    email varchar(45) not null,
    password varchar(32) not null
);

create table allMessages(
    idMessage int not null primary key auto_increment,
    message text not null,
    date datetime not null
);

create table approvedMessages(
    idMessage int not null primary key auto_increment,
    message text not null,
    sentAt datetime not null,
    approvedAt datetime not null,
    idStr varchar(50)
);