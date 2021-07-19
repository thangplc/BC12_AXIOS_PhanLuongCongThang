function UserService() {
    this.getData = function() {
        return axios({
            url: `https://60f3ffaf3cb0870017a8a0cf.mockapi.io/Members/`,
            method: 'GET',
        });
    };
}