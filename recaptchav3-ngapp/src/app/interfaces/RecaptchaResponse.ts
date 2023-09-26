export default interface RecaptchaResponse {
    success: boolean;
    message: string;
    data: {
        success: boolean;
        challenge_ts: string;
        hostname: string;
        score: number;
        action: string;
    };
}
