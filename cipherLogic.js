exports.GetCipher = function (password, Key, randomNum) {
var Key = "e=10001;m=abef72b26a0f2555ad7e7f8b3f4972878235c2df6ea147e58f062a176964eb6dda829756960fdec18fbcabb9cf4d57493ef885093f4bd1a846a63bdebdeefd20eebe71d9f5eb6f8ddb8e9ee7c9de12c6f6963f8486a3434ce0289eeaf5fea94ae1474e13ebcd03d0b7ffdb353b9db4abdda91240bb03e5110282743a9bfe993e578b49b0adde478b3caf7d8a0c7b0355ff8ef106018cedcccfde2db51bca63af10bbb30ce1168d5efdb5e84b01b02c2ffe4d5b6b6c67e1ea54be792a887fc41a866591bfe7afab22c80db20d50d6515dcaa6b039ca3c06dbc623817340d429f43e7a079858f4b863990074051e7d7109be2f1f194114b25537d63ec630b4d789";
var o = [];
function PackageNewPwdOnly(e) {
    var t = [],
        n = 0;
    t[n++] = 1, t[n++] = 1;
    var i, o = e.length;
    for (t[n++] = o, i = 0; o > i; i++) {
        t[n++] = 127 & e.charCodeAt(i)
    }
    return t[n++] = 0, t[n++] = 0, t
}
var a = parseRSAKeyFromString(Key)
function parseRSAKeyFromString(e) {
    var t = e.indexOf(";");
    if (0 > t) {
        return null
    }
    var n = e.substr(0, t),
        i = e.substr(t + 1),
        o = n.indexOf("=");
    if (0 > o) {
        return null
    }
    var a = n.substr(o + 1);
    if (o = i.indexOf("="), 0 > o) {
        return null
    }
    var r = i.substr(o + 1),
        s = new Object;
    return s.n = hexStringToMP(r), s.e = parseInt(a, 16), s
}
function hexStringToMP(e) {
    var t, n, i = Math.ceil(e.length / 4),
        o = new JSMPnumber;
    for (o.size = i, t = 0; i > t; t++) {
        n = e.substr(4 * t, 4), o.data[i - 1 - t] = parseInt(n, 16)
    }
    return o
}
function JSMPnumber() {
    this.size = 1, this.data = [], this.data[0] = 0
}

var r = RSAEncrypt(PackageNewPwdOnly(password), a, randomNum);
return r;

function RSAEncrypt(e, t, randomNum) {
    for (var n = [], i = 42, o = 2 * t.n.size - i, a = 0; a < e.length; a += o) {
        if (a + o >= e.length) {
            var r = RSAEncryptBlock(e.slice(a), t, randomNum);
            r && (n = r.concat(n))
        } else {
            var r = RSAEncryptBlock(e.slice(a, a + o), t, randomNum);
            r && (n = r.concat(n))
        }
    }
    var s = byteArrayToBase64(n);
    console.log(s);
    return s
}
function RSAEncryptBlock(e, t, n) {
    var i = t.n,
        o = t.e,
        a = e.length,
        r = 2 * i.size,
        s = 42;
    if (a + s > r) {
        return null
    }
    applyPKCSv2Padding(e, r, n), e = e.reverse();
    var l = byteArrayToMP(e),
        d = modularExp(l, o, i);
    d.size = i.size;
    var c = mpToByteArray(d);
    return c = c.reverse()
}
function applyPKCSv2Padding(e, t, n) {
    var i, o = e.length,
        a = [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9],
        r = t - o - 40 - 2,
        s = [];
    for (i = 0; r > i; i++) {
        s[i] = 0
    }
    s[r] = 1;
    var l = a.concat(s, e),
        d = [];
    for (i = 0; 20 > i; i++) {
        d[i] = Math.floor(256 * Math.random())
    }
    d = SHA1(d.concat(n));
    var c = MGF(d, t - 21),
        u = XORarrays(l, c),
        p = MGF(u, 20),
        m = XORarrays(d, p),
        f = [];
    for (f[0] = 0, f = f.concat(m, u), i = 0; i < f.length; i++) {
        e[i] = f[i]
    }
}
function SHA1(e) {
    var t, n = e.slice(0);
    PadSHA1Input(n);
    var i = {
        "A": 1732584193,
        "B": 4023233417,
        "C": 2562383102,
        "D": 271733878,
        "E": 3285377520
    };
    for (t = 0; t < n.length; t += 64) {
        SHA1RoundFunction(i, n, t)
    }
    var o = [];
    return wordToBytes(i.A, o, 0), wordToBytes(i.B, o, 4), wordToBytes(i.C, o, 8), wordToBytes(i.D, o, 12), wordToBytes(i.E, o, 16), o
}
function PadSHA1Input(e) {
    var t, n = e.length,
        i = n,
        o = n % 64,
        a = 55 > o ? 56 : 120;
    for (e[i++] = 128, t = o + 1; a > t; t++) {
        e[i++] = 0
    }
    var r = 8 * n;
    for (t = 1; 8 > t; t++) {
        e[i + 8 - t] = 255 & r, r >>>= 8
    }
}
function SHA1RoundFunction(e, t, n) {
    var i, o, a, r = 1518500249,
        s = 1859775393,
        l = 2400959708,
        d = 3395469782,
        c = [],
        u = e.A,
        p = e.B,
        m = e.C,
        f = e.D,
        g = e.E;
    for (o = 0, a = n; 16 > o; o++, a += 4) {
        c[o] = t[a] << 24 | t[a + 1] << 16 | t[a + 2] << 8 | t[a + 3] << 0
    }
    for (o = 16; 80 > o; o++) {
        c[o] = rotateLeft(c[o - 3] ^ c[o - 8] ^ c[o - 14] ^ c[o - 16], 1)
    }
    var v;
    for (i = 0; 20 > i; i++) {
        v = rotateLeft(u, 5) + (p & m | ~p & f) + g + c[i] + r & 4294967295, g = f, f = m, m = rotateLeft(p, 30), p = u, u = v
    }
    for (i = 20; 40 > i; i++) {
        v = rotateLeft(u, 5) + (p ^ m ^ f) + g + c[i] + s & 4294967295, g = f, f = m, m = rotateLeft(p, 30), p = u, u = v
    }
    for (i = 40; 60 > i; i++) {
        v = rotateLeft(u, 5) + (p & m | p & f | m & f) + g + c[i] + l & 4294967295, g = f, f = m, m = rotateLeft(p, 30), p = u, u = v
    }
    for (i = 60; 80 > i; i++) {
        v = rotateLeft(u, 5) + (p ^ m ^ f) + g + c[i] + d & 4294967295, g = f, f = m, m = rotateLeft(p, 30), p = u, u = v
    }
    e.A = e.A + u & 4294967295, e.B = e.B + p & 4294967295, e.C = e.C + m & 4294967295, e.D = e.D + f & 4294967295, e.E = e.E + g & 4294967295
}
function rotateLeft(e, t) {
    var n = e >>> 32 - t,
        i = (1 << 32 - t) - 1,
        o = e & i;
    return o << t | n
}
function wordToBytes(e, t, n) {
    var i;
    for (i = 3; i >= 0; i--) {
        t[n + i] = 255 & e, e >>>= 8
    }
}
function MGF(e, t) {
    if (t > 4096) {
        return null
    }
    var n = e.slice(0),
        i = n.length;
    n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i] = 0;
    for (var o = 0, a = []; a.length < t;) {
        n[i] = o++, a = a.concat(SHA1(n))
    }
    return a.slice(0, t)
}
function XORarrays(e, t) {
    if (e.length != t.length) {
        return null
    }
    for (var n = [], i = e.length, o = 0; i > o; o++) {
        n[o] = e[o] ^ t[o]
    }
    return n
}
function byteArrayToMP(e) {
    var t = new JSMPnumber,
        n = 0,
        i = e.length,
        o = i >> 1;
    for (n = 0; o > n; n++) {
        t.data[n] = e[2 * n] + (e[1 + 2 * n] << 8)
    }
    return i % 2 && (t.data[n++] = e[i - 1]), t.size = n, t
}
function modularExp(e, t, n) {
    for (var i = [], o = 0; t > 0;) {
        i[o] = 1 & t, t >>>= 1, o++
    }
    for (var a = duplicateMP(e), r = o - 2; r >= 0; r--) {
        a = modularMultiply(a, a, n), 1 == i[r] && (a = modularMultiply(a, e, n))
    }
    return a
}
function duplicateMP(e) {
    var t = new JSMPnumber;
    return t.size = e.size, t.data = e.data.slice(0), t
}
function modularMultiply(e, t, n) {
    var i = multiplyMP(e, t),
        o = divideMP(i, n);
    return o.r
}
function multiplyMP(e, t) {
    var n = new JSMPnumber;
    n.size = e.size + t.size;
    var i, o;
    for (i = 0; i < n.size; i++) {
        n.data[i] = 0
    }
    var a = e.data,
        r = t.data,
        s = n.data;
    if (e == t) {
        for (i = 0; i < e.size; i++) {
            s[2 * i] += a[i] * a[i]
        }
        for (i = 1; i < e.size; i++) {
            for (o = 0; i > o; o++) {
                s[i + o] += 2 * a[i] * a[o]
            }
        }
    } else {
        for (i = 0; i < e.size; i++) {
            for (o = 0; o < t.size; o++) {
                s[i + o] += a[i] * r[o]
            }
        }
    }
    return normalizeJSMP(n), n
}
function normalizeJSMP(e) {
    var t, n, i, o, a;
    for (i = e.size, n = 0, t = 0; i > t; t++) {
        o = e.data[t], o += n, a = o, n = Math.floor(o / 65536), o -= 65536 * n, e.data[t] = o
    }
}
function divideMP(e, t) {
    var n = e.size,
        i = t.size,
        o = t.data[i - 1],
        a = t.data[i - 1] + t.data[i - 2] / 65536,
        r = new JSMPnumber;
    r.size = n - i + 1, e.data[n] = 0;
    for (var s = n - 1; s >= i - 1; s--) {
        var l = s - i + 1,
            d = Math.floor((65536 * e.data[s + 1] + e.data[s]) / a);
        if (d > 0) {
            var c = multiplyAndSubtract(e, d, t, l);
            for (0 > c && (d--, multiplyAndSubtract(e, d, t, l)); c > 0 && e.data[s] >= o;) {
                c = multiplyAndSubtract(e, 1, t, l), c > 0 && d++
            }
        }
        r.data[l] = d
    }
    removeLeadingZeroes(e);
    var u = {
        "q": r,
        "r": e
    };
    return u
}
function multiplyAndSubtract(e, t, n, i) {
    var o, a = e.data.slice(0),
        r = 0,
        s = e.data;
    for (o = 0; o < n.size; o++) {
        var l = r + n.data[o] * t;
        r = l >>> 16, l -= 65536 * r, l > s[o + i] ? (s[o + i] += 65536 - l, r++) : s[o + i] -= l
    }
    return r > 0 && (s[o + i] -= r), s[o + i] < 0 ? (e.data = a.slice(0), -1) : 1
}
function removeLeadingZeroes(e) {
    for (var t = e.size - 1; t > 0 && 0 == e.data[t--];) {
        e.size--
    }
}
function mpToByteArray(e) {
    var t = [],
        n = 0,
        i = e.size;
    for (n = 0; i > n; n++) {
        t[2 * n] = 255 & e.data[n];
        var o = e.data[n] >>> 8;
        t[2 * n + 1] = o
    }
    return t
}
function byteArrayToBase64(e) {
    var t, n, i = e.length,
        o = "";
    for (t = i - 3; t >= 0; t -= 3) {
        n = e[t] | e[t + 1] << 8 | e[t + 2] << 16, o += base64Encode(n, 4)
    }
    var a = i % 3;
    for (n = 0, t += 2; t >= 0; t--) {
        n = n << 8 | e[t]
    }
    return 1 == a ? o = o + base64Encode(n << 16, 2) + "==" : 2 == a && (o = o + base64Encode(n << 8, 3) + "="), o
}
function base64Encode(e, t) {
    var n, i = "";
    for (n = t; 4 > n; n++) {
        e >>= 6
    }
    for (n = 0; t > n; n++) {
        i = mapByteToBase64(63 & e) + i, e >>= 6
    }
    return i
}
function mapByteToBase64(e) {
    return e >= 0 && 26 > e ? String.fromCharCode(65 + e) : e >= 26 && 52 > e ? String.fromCharCode(97 + e - 26) : e >= 52 && 62 > e ? String.fromCharCode(48 + e - 52) : 62 == e ? "+" : "/"
}
  }