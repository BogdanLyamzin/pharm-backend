const obj = {
    name: {
        name: "name",
        req: /^$|^.{2,255}$/,
        error: "Название должно содержать не менее двух символов!",
        required: "Название должно быть указано!"

    },
    integerPosition: {
        name: "integerPosition",
        req: /^\d+$/,
        error: "Номер позиции не является целым положительным числом!",
        required: "Позиция пункта меню должна быть указана!"
    }
};

module.exports = obj;
