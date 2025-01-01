// Hàm đổi chế độ nền
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme', !isDark);
    document.getElementById('toggle-theme').innerText = isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';

    // Lưu trạng thái vào localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
function jdFromDate(dd, mm, yy) {
    if (mm < 3) {
        yy--;
        mm += 12;
    }
    var A = Math.floor(yy / 100);
    var B = 2 - A + Math.floor(A / 4);
    var jd = Math.floor(365.25 * (yy + 4716)) + Math.floor(30.6001 * (mm + 1)) + dd + B - 1524.5;
    return jd;
}

function getNewMoonDay(k, timeZone) {
    var T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
    T = k / 1236.85; 
    T2 = T * T;
    T3 = T2 * T;
    dr = Math.PI / 180;
    Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 -= 0.4068 * Math.sin(Mpr * dr);
    C1 += 0.0161 * Math.sin(2 * dr * Mpr);
    C1 -= 0.0004 * Math.sin(3 * dr * Mpr);
    C1 += 0.0104 * Math.sin(2 * dr * F);
    C1 -= 0.0051 * Math.sin(dr * (M + Mpr));
    C1 -= 0.0074 * Math.sin(dr * (M - Mpr));
    C1 += 0.0004 * Math.sin(dr * (2 * F + M));
    C1 -= 0.0004 * Math.sin(dr * (2 * F - M));
    C1 -= 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 += 0.0010 * Math.sin(dr * (2 * F - Mpr));
    C1 += 0.0005 * Math.sin(dr * (2 * Mpr + M));
    if (T < -11) {
        deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
        deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    JdNew = Jd1 + C1 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
}

function getLunarNewYear(year, timeZone) {
    var k = Math.floor((jdFromDate(31, 12, year) - 2415021.076998695) / 29.530588853);
    var lunarNewYear = getNewMoonDay(k + 1, timeZone);
    return lunarNewYear;
}

function getLunarNewYear(year, timeZone) {
    const k = Math.floor((jdFromDate(31, 12, year - 1) - 2415021.076998695) / 29.530588853);
    const lunarNewYearJD = getNewMoonDay(k + 1, timeZone);
    return lunarNewYearJD;
}

function getNextLunarNewYear(timeZone) {
    const today = new Date(); // Ngày hiện tại
    const currentYear = today.getFullYear(); // Năm hiện tại

    // Tính ngày Tết Nguyên Đán năm nay
    const lunarNewYearThisYearJD = getLunarNewYear(currentYear, timeZone);
    const lunarNewYearThisYear = jdToDate(lunarNewYearThisYearJD);

    // Chuyển ngày hôm nay sang Julian
    const todayJD = jdFromDate(today.getDate(), today.getMonth() + 1, today.getFullYear());

    if (todayJD < lunarNewYearThisYearJD) {
        // Nếu hôm nay trước Tết Nguyên Đán năm nay, trả về ngày Tết năm nay
        return lunarNewYearThisYear;
    } else {
        // Nếu hôm nay là Tết hoặc qua, trả về ngày Tết năm sau
        const lunarNewYearNextYearJD = getLunarNewYear(currentYear + 1, timeZone);
        return jdToDate(lunarNewYearNextYearJD);
    }
}

function getLunarNewYear(year, timeZone) {
    const k = Math.floor((jdFromDate(31, 12, year - 1) - 2415021.076998695) / 29.530588853);
    const lunarNewYearJD = getNewMoonDay(k + 1, timeZone);
    return lunarNewYearJD;
}

function jdToDate(jd) {
    var z = Math.floor(jd + 0.5);
    var f = jd + 0.5 - z;
    var a = z;
    if (z >= 2299161) {
        var alpha = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + alpha - Math.floor(alpha / 4);
    }
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var day = b - d - Math.floor(30.6001 * e) + f;
    var month = (e < 14) ? e - 1 : e - 13;
    var year = (month > 2) ? c - 4716 : c - 4715;

    return { day: Math.floor(day), month: month, year: year };
}

function jdFromDate(dd, mm, yy) {
    if (mm < 3) {
        yy--;
        mm += 12;
    }
    var A = Math.floor(yy / 100);
    var B = 2 - A + Math.floor(A / 4);
    var jd = Math.floor(365.25 * (yy + 4716)) + Math.floor(30.6001 * (mm + 1)) + dd + B - 1524.5;
    return jd;
}

function calculateDaysUntilNextMonday(nextDate) {
    const today = new Date();
    const nextMonday = new Date(nextDate.year, nextDate.month - 1, nextDate.day);

    // Tính số ngày thứ Hai từ ngày hôm nay đến ngày Tết
    let daysUntilNextMonday = 0;
    while (today <= nextMonday) {
        if (today.getDay() === 1) { // Thứ Hai
            daysUntilNextMonday++;
        }
        today.setDate(today.getDate() + 1);
    }
    return daysUntilNextMonday;
}

// Tính toán và hiển thị kết quả
const timeZone = 7; // Giờ Việt Nam (GMT+7)
const nextLunarNewYear = getNextLunarNewYear(timeZone);
const daysUntilNextMonday = calculateDaysUntilNextMonday(nextLunarNewYear);

document.getElementById('tet-date').innerText = `Ngày Tết Nguyên Đán tiếp theo: ${nextLunarNewYear.day}/${nextLunarNewYear.month}/${nextLunarNewYear.year}`;
document.getElementById('days-until-monday').innerText = `Còn ${daysUntilNextMonday} thứ Hai nữa để đến ngày đó.`;
