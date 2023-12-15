import { rest } from 'msw';

const baseURL = "https://8080-rstandev-garageguru-qf6hm2jbgt7.ws-eu107.gitpod.io/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, ( req, res, ctx ) => {
        return res(ctx.json({
            pk: 1,
            username: "admin-rs",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 1,
            profile_image: "https://res.cloudinary.com/dyv8xopsd/image/upload/v1/media/images/austin-distel-7uoMmzPd2JA-unsplash_kgpq5x"
        })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, ( req, res, ctx ) => {
        return res(ctx.status(200));
    }),
];