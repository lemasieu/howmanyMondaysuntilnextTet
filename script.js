// Hàm đổi chế độ nền
function toggleTheme() {
    const body = document.body;
    const isLight = body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme', !isLight);
    document.getElementById('toggle-theme').innerText = isLight ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng';

    // Lưu trạng thái vào localStorage
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Tải trạng thái chế độ nền từ localStorage khi khởi động trang
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
    document.getElementById('toggle-theme').innerText = isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';
}

// Sự kiện chuyển đổi khi nhấn nút
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

// Tải chế độ nền khi mở trang
loadTheme();

// Các mã tính toán ngày Tết Nguyên Đán và hiển thị kết quả
/**
 * Copyright 2004 Ho Ngoc Duc [http://come.to/duc]. All Rights Reserved.<p>
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice appears in all copies.
 */

// ====== Bảng tra âm lịch Hồ Ngọc Đức ======
const TK19 = [0x30baa3, 0x56ab50, 0x422ba0, 0x2cab61, 0x52a370, 0x3c51e8, 0x60d160, 0x4ae4b0, 0x376926, 0x58daa0, 0x445b50, 0x3116d2, 0x562ae0, 0x3ea2e0, 0x28e2d2, 0x4ec950, 0x38d556, 0x5cb520, 0x46b690, 0x325da4, 0x5855d0, 0x4225d0, 0x2ca5b3, 0x52a2b0, 0x3da8b7, 0x60a950, 0x4ab4a0, 0x35b2a5, 0x5aad50, 0x4455b0, 0x302b74, 0x562570, 0x4052f9, 0x6452b0, 0x4e6950, 0x386d56, 0x5e5aa0, 0x46ab50, 0x3256d4, 0x584ae0, 0x42a570, 0x2d4553, 0x50d2a0, 0x3be8a7, 0x60d550, 0x4a5aa0, 0x34ada5, 0x5a95d0, 0x464ae0, 0x2eaab4, 0x54a4d0, 0x3ed2b8, 0x64b290, 0x4cb550, 0x385757, 0x5e2da0, 0x4895d0, 0x324d75, 0x5849b0, 0x42a4b0, 0x2da4b3, 0x506a90, 0x3aad98, 0x606b50, 0x4c2b60, 0x359365, 0x5a9370, 0x464970, 0x306964, 0x52e4a0, 0x3cea6a, 0x62da90, 0x4e5ad0, 0x392ad6, 0x5e2ae0, 0x4892e0, 0x32cad5, 0x56c950, 0x40d4a0, 0x2bd4a3, 0x50b690, 0x3a57a7, 0x6055b0, 0x4c25d0, 0x3695b5, 0x5a92b0, 0x44a950, 0x2ed954, 0x54b4a0, 0x3cb550, 0x286b52, 0x4e55b0, 0x3a2776, 0x5e2570, 0x4852b0, 0x32aaa5, 0x56e950, 0x406aa0, 0x2abaa3, 0x50ab50];
const TK20 = [0x3c4bd8, 0x624ae0, 0x4ca570, 0x3854d5, 0x5cd260, 0x44d950, 0x315554, 0x5656a0, 0x409ad0, 0x2a55d2, 0x504ae0, 0x3aa5b6, 0x60a4d0, 0x48d250, 0x33d255, 0x58b540, 0x42d6a0, 0x2cada2, 0x5295b0, 0x3f4977, 0x644970, 0x4ca4b0, 0x36b4b5, 0x5c6a50, 0x466d50, 0x312b54, 0x562b60, 0x409570, 0x2c52f2, 0x504970, 0x3a6566, 0x5ed4a0, 0x48ea50, 0x336a95, 0x585ad0, 0x442b60, 0x2f86e3, 0x5292e0, 0x3dc8d7, 0x62c950, 0x4cd4a0, 0x35d8a6, 0x5ab550, 0x4656a0, 0x31a5b4, 0x5625d0, 0x4092d0, 0x2ad2b2, 0x50a950, 0x38b557, 0x5e6ca0, 0x48b550, 0x355355, 0x584da0, 0x42a5b0, 0x2f4573, 0x5452b0, 0x3ca9a8, 0x60e950, 0x4c6aa0, 0x36aea6, 0x5aab50, 0x464b60, 0x30aae4, 0x56a570, 0x405260, 0x28f263, 0x4ed940, 0x38db47, 0x5cd6a0, 0x4896d0, 0x344dd5, 0x5a4ad0, 0x42a4d0, 0x2cd4b4, 0x52b250, 0x3cd558, 0x60b540, 0x4ab5a0, 0x3755a6, 0x5c95b0, 0x4649b0, 0x30a974, 0x56a4b0, 0x40aa50, 0x29aa52, 0x4e6d20, 0x39ad47, 0x5eab60, 0x489370, 0x344af5, 0x5a4970, 0x4464b0, 0x2c74a3, 0x50ea50, 0x3d6a58, 0x6256a0, 0x4aaad0, 0x3696d5, 0x5c92e0];
const TK21 = [0x46c960, 0x2ed954, 0x54d4a0, 0x3eda50, 0x2a7552, 0x4e56a0, 0x38a7a7, 0x5ea5d0, 0x4a92b0, 0x32aab5, 0x58a950, 0x42b4a0, 0x2cbaa4, 0x50ad50, 0x3c55d9, 0x624ba0, 0x4ca5b0, 0x375176, 0x5c5270, 0x466930, 0x307934, 0x546aa0, 0x3ead50, 0x2a5b52, 0x504b60, 0x38a6e6, 0x5ea4e0, 0x48d260, 0x32ea65, 0x56d520, 0x40daa0, 0x2d56a3, 0x5256d0, 0x3c4afb, 0x6249d0, 0x4ca4d0, 0x37d0b6, 0x5ab250, 0x44b520, 0x2edd25, 0x54b5a0, 0x3e55d0, 0x2a55b2, 0x5049b0, 0x3aa577, 0x5ea4b0, 0x48aa50, 0x33b255, 0x586d20, 0x40ad60, 0x2d4b63, 0x525370, 0x3e49e8, 0x60c970, 0x4c54b0, 0x3768a6, 0x5ada50, 0x445aa0, 0x2fa6a4, 0x54aad0, 0x4052e0, 0x28d2e3, 0x4ec950, 0x38d557, 0x5ed4a0, 0x46d950, 0x325d55, 0x5856a0, 0x42a6d0, 0x2c55d4, 0x5252b0, 0x3ca9b8, 0x62a930, 0x4ab490, 0x34b6a6, 0x5aad50, 0x4655a0, 0x2eab64, 0x54a570, 0x4052b0, 0x2ab173, 0x4e6930, 0x386b37, 0x5e6aa0, 0x48ad50, 0x332ad5, 0x582b60, 0x42a570, 0x2e52e4, 0x50d160, 0x3ae958, 0x60d520, 0x4ada90, 0x355aa6, 0x5a56d0, 0x462ae0, 0x30a9d4, 0x54a2d0, 0x3ed150, 0x28e952];
const TK22 = [0x4eb520, 0x38d727, 0x5eada0, 0x4a55b0, 0x362db5, 0x5a45b0, 0x44a2b0, 0x2eb2b4, 0x54a950, 0x3cb559, 0x626b20, 0x4cad50, 0x385766, 0x5c5370, 0x484570, 0x326574, 0x5852b0, 0x406950, 0x2a7953, 0x505aa0, 0x3baaa7, 0x5ea6d0, 0x4a4ae0, 0x35a2e5, 0x5aa550, 0x42d2a0, 0x2de2a4, 0x52d550, 0x3e5abb, 0x6256a0, 0x4c96d0, 0x3949b6, 0x5e4ab0, 0x46a8d0, 0x30d4b5, 0x56b290, 0x40b550, 0x2a6d52, 0x504da0, 0x3b9567, 0x609570, 0x4a49b0, 0x34a975, 0x5a64b0, 0x446a90, 0x2cba94, 0x526b50, 0x3e2b60, 0x28ab61, 0x4c9570, 0x384ae6, 0x5cd160, 0x46e4a0, 0x2eed25, 0x54da90, 0x405b50, 0x2c36d3, 0x502ae0, 0x3a93d7, 0x6092d0, 0x4ac950, 0x32d556];

function INT(x) { return Math.floor(x); }

function jdn(dd, mm, yy) {
    let a = INT((14 - mm) / 12);
    let y = yy + 4800 - a;
    let m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    return jd;
}

function jdn2date(jd) {
    let Z = jd;
    let alpha, A, B, C, D, E;
    if (Z < 2299161) A = Z;
    else {
        alpha = INT((Z - 1867216.25) / 36524.25);
        A = Z + 1 + alpha - INT(alpha / 4);
    }
    B = A + 1524;
    C = INT((B - 122.1) / 365.25);
    D = INT(365.25 * C);
    E = INT((B - D) / 30.6001);
    let dd = INT(B - D - INT(30.6001 * E));
    let mm = (E < 14) ? E - 1 : E - 13;
    let yy = (mm < 3) ? C - 4715 : C - 4716;
    return { day: dd, month: mm, year: yy };
}

function LunarDate(dd, mm, yy, leap, jd) {
    this.day = dd;
    this.month = mm;
    this.year = yy;
    this.leap = leap;
    this.jd = jd;
}

function decodeLunarYear(yy, k) {
    const monthLengths = [29, 30];
    let regularMonths = new Array(12);
    let offsetOfTet = k >> 17;
    let leapMonth = k & 0xf;
    let leapMonthLength = monthLengths[(k >> 16) & 0x1];
    let solarNY = jdn(1, 1, yy);
    let currentJD = solarNY + offsetOfTet;
    let j = k >> 4;
    for (let i = 0; i < 12; i++) {
        regularMonths[12 - i - 1] = monthLengths[j & 0x1];
        j >>= 1;
    }
    let ly = [];
    if (leapMonth == 0) {
        for (let mm = 1; mm <= 12; mm++) {
            ly.push(new LunarDate(1, mm, yy, 0, currentJD));
            currentJD += regularMonths[mm - 1];
        }
    } else {
        for (let mm = 1; mm <= leapMonth; mm++) {
            ly.push(new LunarDate(1, mm, yy, 0, currentJD));
            currentJD += regularMonths[mm - 1];
        }
        ly.push(new LunarDate(1, leapMonth, yy, 1, currentJD));
        currentJD += leapMonthLength;
        for (let mm = leapMonth + 1; mm <= 12; mm++) {
            ly.push(new LunarDate(1, mm, yy, 0, currentJD));
            currentJD += regularMonths[mm - 1];
        }
    }
    return ly;
}

function getYearInfo(yyyy) {
    let yearCode;
    if (yyyy < 1900) yearCode = TK19[yyyy - 1800];
    else if (yyyy < 2000) yearCode = TK20[yyyy - 1900];
    else if (yyyy < 2100) yearCode = TK21[yyyy - 2000];
    else yearCode = TK22[yyyy - 2100];
    return decodeLunarYear(yyyy, yearCode);
}

function findLunarDate(jd, ly) {
    let i = ly.length - 1;
    while (jd < ly[i].jd) i--;
    let off = jd - ly[i].jd;
    return new LunarDate(ly[i].day + off, ly[i].month, ly[i].year, ly[i].leap, jd);
}

function getLunarDate(dd, mm, yyyy) {
    if (yyyy < 1800 || 2199 < yyyy) return new LunarDate(0, 0, 0, 0, 0);
    let ly = getYearInfo(yyyy);
    let jd = jdn(dd, mm, yyyy);
    if (jd < ly[0].jd) ly = getYearInfo(yyyy - 1);
    return findLunarDate(jd, ly);
}

// ====== Chuyển đổi ngày dương ⇄ Julian Day ======
function jdFromDate(dd, mm, yy) {
    if (mm < 3) {
        yy--;
        mm += 12;
    }
    var A = Math.floor(yy / 100);
    var B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (yy + 4716)) + Math.floor(30.6001 * (mm + 1)) + dd + B - 1524.5;
}

function jdToDate(jd) {
    var z = Math.floor(jd + 0.5);
    var a = (z >= 2299161) ? z + 1 + Math.floor((z - 1867216.25) / 36524.25) - Math.floor(Math.floor((z - 1867216.25) / 36524.25) / 4) : z;
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var day = b - d - Math.floor(30.6001 * e);
    var month = (e < 14) ? e - 1 : e - 13;
    var year = (month > 2) ? c - 4716 : c - 4715;
    return { day: day, month: month, year: year };
}

// ====== Tính ngày Sóc ======
function getNewMoonDay(k, timeZone) {
    var T = k / 1236.85, T2 = T * T, T3 = T2 * T;
    var dr = Math.PI / 180;
    var Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    return Math.floor(Jd1 + 0.5 + timeZone / 24);
}

// ====== Xác định tháng 11 âm lịch ======
function getLunarMonth11(year, timeZone) {
    // Lấy ngày Đông chí (khoảng 22/12)
    let jdWinter = jdFromDate(22, 12, year);
    let k = Math.floor((jdWinter - 2415021.076998695) / 29.530588853);
    let jdNewMoon = getNewMoonDay(k, timeZone);
    // Nếu ngày Sóc tìm được lại sau Đông chí, lùi lại 1 chu kỳ
    while (jdNewMoon > jdWinter) {
        k--;
        jdNewMoon = getNewMoonDay(k, timeZone);
    }
    return jdNewMoon;
}

// ====== Lấy ngày Tết Nguyên Đán ======
function getLunarNewYear(year) {
    // Tìm mùng 1 tháng Giêng trong năm dương lịch 'year'
    // Tết luôn rơi vào khoảng 21/1 – 20/2
    for (let month = 1; month <= 2; month++) {
        let daysInMonth = (month === 2) ? 28 : 31; // tháng 2 có 28 ngày là đủ vì Tết không qua 20/2
        let startDay = (month === 1) ? 1 : 1;
        for (let day = startDay; day <= daysInMonth; day++) {
            let lunar = getLunarDate(day, month, year);
            if (lunar.month === 1 && lunar.day === 1 && lunar.leap === 0) {
                return { day: day, month: month, year: year };
            }
        }
    }
    // Dự phòng: nếu không tìm thấy (hiếm), thử tháng 3
    return null;
}

// ====== Xác định ngày Tết Nguyên Đán tiếp theo ======
function getNextLunarNewYear() {
    const today = new Date();
    const currentYear = today.getFullYear();
    let tet = getLunarNewYear(currentYear);
    // Nếu Tết năm nay đã qua, lấy Tết năm sau
    if (tet) {
        let tetDate = new Date(tet.year, tet.month - 1, tet.day);
        if (today > tetDate) {
            tet = getLunarNewYear(currentYear + 1);
        }
    } else {
        // Trường hợp lỗi, thử năm sau
        tet = getLunarNewYear(currentYear + 1);
    }
    return tet;
}

// ====== Tính số thứ Hai còn lại trước Tết ======
function calculateMondaysUntil(nextDate) {
    let today = new Date();
    let nextTet = new Date(nextDate.year, nextDate.month - 1, nextDate.day);
    let mondays = 0;

    while (today <= nextTet) {
        if (today.getDay() === 1) mondays++;
        today.setDate(today.getDate() + 1);
    }
    return mondays;
}

// ====== Cập nhật giao diện ======
const nextTet = getNextLunarNewYear();
if (nextTet) {
    document.getElementById('tet-date').innerText = 
        `Ngày Tết Nguyên Đán tiếp theo: ${nextTet.day}/${nextTet.month}/${nextTet.year}`;
    const mondaysLeft = calculateMondaysUntil(nextTet);
    document.getElementById('days-until-monday').innerText = 
        `Còn ${mondaysLeft} thứ Hai nữa để đến ngày đó.`;
} else {
    document.getElementById('tet-date').innerText = 'Không tìm thấy Tết';
}