let data = [
    {
        id: 1,
        name: "Chris Pelayo",
        bio: "He likes turtles"
    },
    {
        id: 2,
        name: "Monica Pacheco Pineda",
        bio: "The most beautiful woman alive"
    }
];

const getUsers = () => {
    return data;
};

const getUser = (id) => {
    const user = data.find(user => user.id == id);

    return user;
};

const createUser = (_data) => {
    const user = {
        id: data.length + 1,
        name: _data.name,
        bio: _data.bio
    };

    data.push(user);

    return user;
};

const updateUser = (id, _data) => {
    const index = data.findIndex(user => user.id == id);
	data[index] = {
        id: data[index].id,
        ..._data
	};
	
	return data[index];
};

const destroyUser = (id) => {
    const index = data.findIndex(user => user.id == id);
    data = data.filter(user => user.id != id);

    return 1;
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    destroyUser
}