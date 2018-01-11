export const prepareQuery = (query, token, method = '') => {
  return `${method}?access_token=${token}${query}`;
};

export const prepareIdQuery = id => {
    return `&ids=${id}&fields=name,link,events{start_time.order(chronological),end_time,name,place,description,cover}&limit=100`;
};

export const promises = {
    init: (params) => {
        return new Promise((resolve) => {
            if (typeof FB !== 'undefined') {
                resolve();
            } else {
                window.fbAsyncInit = () => {
                    FB.init({
                        appId      : params.appId,
                        cookie     : true,  // enable cookies to allow the server to access the session
                        xfbml      : true,  // parse social plugins on this page
                        version    : params.version || 'v2.5' // use version 2.5
                    });
                    resolve();
                };
                (function(d, s, id) {
                    const fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    const js = d.createElement(s); js.id = id;
                    js.src = '//connect.facebook.net/en_US/sdk.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        });
    },
    checkLoginState: () => {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus( response => response.status === 'connected' ? resolve(response) : reject(response) );
        });
    },
    login: () => {
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                response.status === 'connected' ? resolve(response) : reject(response);
            });
        });
    },
    logout: () => {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                response.authResponse ? resolve(response) : reject(response);
            });
        });
    },
    fetchUser: () => {
        return new Promise((resolve, reject) => {
            FB.api(
                '/me',
                {fields: 'first_name, last_name, gender'},
                response => response.error ? reject(response) : resolve(response)
            );
        });
    },
    runQuery: (query, token, method) => {
        return new Promise((resolve, reject) => {
            FB.api(
                prepareQuery(query, token, method),
                response => response.error ? reject(response) : resolve(response)
            );
        });
    }
};
