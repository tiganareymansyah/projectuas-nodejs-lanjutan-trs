app.use((req, res, next) => {
    if (req.path.startsWith("/api/login") || req.path.startsWith("/assets")) {
      next();
    }
    else {
        let authorized = false;
        if (req.cookies.token) {
            try {
                jwt.verify(req.cookies.token, process.env.SECRET_KEY);
                authorized = true;
            }
            catch (err) {
                res.setHeader("Cache-Control", "no-store"); // khusus Vercel
                res.clearCookie("token");
            }
        }
        if (authorized) {
            if (req.path.startsWith("/login")) {
                res.redirect("/");
            }
            else {
                next();
            }
        }
        else {
            if (req.path.startsWith("/login")) {
                next();
            }
            else {
                if (req.path.startsWith("/api")) {
                res.status(401);
                res.send("Anda harus login terlebih dahulu.");
                }
                else {
                    res.redirect("/login");
                }
            }
        }
    }
});