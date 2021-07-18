const APILink = 'https://60f3ffaf3cb0870017a8a0cf.mockapi.io/Users';

function UserService() {
    this.getData = function() {
        return axios({
            url: APILink,
            method: 'GET',
        });
    }
    this.addUser = function(user) {
        return axios({
            url: APILink,
            method: 'POST',
            data: user,
        });
    };
    this.deleteUser = function(id) {
        return axios({
            url: APILink + '/' + id,
            method: 'DELETE',
        });
    }
    this.loadDataID = function(id) {
        return axios({
            url: APILink + '/' + id,
            method: "GET",
        });
    };
    this.updateData = function(id, user) {
        return axios({
            url: APILink + '/' + id,
            method: "PUT",
            data: user,
        });
    };
}