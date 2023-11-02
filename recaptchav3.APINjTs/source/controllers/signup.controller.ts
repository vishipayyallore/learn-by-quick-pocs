/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { post } from '../routes/posts';

type RecaptchaResponse = {
    success: boolean;
    challenge_ts: Date;
    hostname: string;
    score: number;
    action: string;
};

// adding a post
const signup = async (req: Request, res: Response, next: NextFunction) => {

    const postBody = {
        method: "POST",
    };

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.recaptchaToken}`

    fetch(url, postBody)
        .then(response => response.json())
        .then(google_response => {
            console.log(google_response);
            return res.status(200).json({
                data: google_response,
                message: 'Recaptcha response',
                success: true
            });
        });

    // return response
    // return res.status(200).json({
    //     data: responseData,
    //     message: 'Recaptcha response',
    //     success: true
    // });
};

export default { signup };