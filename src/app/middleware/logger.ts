export const logger = (req: any, res: any, next: any) => {
    res.on("finish", () => {
        console.log(
            req.method,
            decodeURI(req.url),
            res.statusCode,
            res.statusMessage
        );
    });
    next();
};
