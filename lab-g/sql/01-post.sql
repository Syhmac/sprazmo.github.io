create table if not exists post
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    subject text not null,
    content text not null
);

create table if not exists car
(
    id      integer not null
        constraint car_pk
            primary key autoincrement,
    manufacturer text not null,
    model text not null,
    year integer not null
);