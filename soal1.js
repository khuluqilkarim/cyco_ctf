const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cookieParser());

// Middleware untuk memeriksa user agent
function checkUserAgent(req, res, next) {
  const userAgent = req.get("User-Agent");

  // Ganti dengan string yang sesuai dengan user agent "Cycology browser"
  const expectedUserAgent = "Cycology browser";

  if (userAgent !== expectedUserAgent) {
    // Jika user agent tidak sesuai, kirim respons "Anda tidak menggunakan Cycology browser"
    res.status(403).send("Anda tidak menggunakan Cycology browser.");
  } else {
    next();
  }
}

// Middleware untuk memeriksa referer
function checkReferer(req, res, next) {
  const referer = req.get("Referer");

  // Ganti dengan referer yang diharapkan
  const expectedReferer = "http://cycologyittelkomsby.com";

  if (referer !== expectedReferer) {
    // Jika referer tidak sesuai, kirim respons "Saya hanya percaya kunjungan pengguna melalui situs web asli Cycology"
    res
      .status(403)
      .send(
        "Saya hanya percaya kunjungan pengguna melalui situs web asli Cycology."
      );
  } else {
    next();
  }
}

function checkDNT(req, res, next) {
  const DNT = req.get("DNT");

  const expectedDNT = "1";

  if (DNT !== expectedDNT) {
    res.status(403).send("Saya tidak mempercayai pengguna yang dapat dilacak.");
  } else {
    next();
  }
}

// Middleware untuk memeriksa tingkat akses
function checkAccessLevel(req, res, next) {
  const userAccessLevel = req.cookies.accessLevel;
  // gunakan unicode-shift-cipher shift 5 dan 10
  if (userAccessLevel === "firns") {
    // Jika tingkat akses adalah admin, tampilkan tampilan admin
    res.send("mungkin bukan admin yang ini clue : kepanjangan dari admin");
  } else if (userAccessLevel === "knwsxs}~|k~y|") {
    res.send("CycoFlag{s1mpl3_st3g_w3b}");
  } else if (userAccessLevel === "admin") {
    res.send(
      "hai admin ,tapi bukan disini flagnya clue : antara 5 dan 10 ya (lanjutan clue pada gambar)"
    );
  } else if (userAccessLevel === "user") {
    // Jika tingkat akses adalah user, tampilkan tampilan user
    res.send(
      "<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8' /> <meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>user</title> </head> <body> <p>Halo, user!\nAnda perlu menjadi admin jika ingin mendapatkan flag</p> <img src='https://example-cyndi.000webhostapp.com/cycology/clue.jpg'/></body></html> <!-- coba cek bagian foto -->"
    );
  } else {
    // Jika tidak ada atau tingkat akses tidak valid, arahkan ke halaman login
    res.redirect("/login");
  }
}

// Halaman login untuk mengatur tingkat akses melalui cookies
app.get("/login", (req, res) => {
  checkUserAgent(req, res, () => {
    checkReferer(req, res, () => {
      checkDNT(req, res, () => {
        checkAccessLevel(req, res);
      });
    });
  });
});

// Halaman untuk keluar dan menghapus cookies tingkat akses
app.get("/logout", (req, res) => {
  res.clearCookie("accessLevel");
  res.send("Anda telah keluar.");
});

// Halaman yang memeriksa user agent, referer, dan tingkat akses
app.get("/", (req, res) => {
  res.cookie("accessLevel", "user");
  res.send("selamat datang\nharap lakukan login");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
