import { authenticationService } from '../_services';

// export function handleResponse(response) {
//     return response.text().then(text => {
//         console.log(text);
//         const data = text && JSON.parse(text);
//         if(!response.ok) {
//             if([401, 403].indexOf(response.status) !== -1) {
//                 // auto logout if 401 Unauthorized or 403 Forbidden response return from api
//                 authenticationService.logout();
//                 window.location.reload();
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }

export function handleResponse(response) {
    console.log(response.status + ' hRS')
    if (response.status !== 200){
        if(response.status == 401 || response.status == 403){
            authenticationService.logout();
            window.location.reload();
        }
        const error = "Unauthorized" || response.statusText
        return error;
    }

    return response.data;
}