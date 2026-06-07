export type PrefecturePopulation = {
  name: string
  shortName: string
  x: number
  y: number
  population2015: number
  population2020: number
  population2025: number
  changeRate2015To2020: number
  changeRate2020To2025: number
  accelerationPoint: number
}

export const prefecturePopulation: PrefecturePopulation[] = [
  { name: '北海道', shortName: '北海', x: 8, y: 0, population2015: 5381733, population2020: 5224614, population2025: 4985419, changeRate2015To2020: -2.9, changeRate2020To2025: -4.6, accelerationPoint: -1.7 },
  { name: '青森県', shortName: '青森', x: 8, y: 1, population2015: 1308265, population2020: 1237984, population2025: 1140395, changeRate2015To2020: -5.4, changeRate2020To2025: -7.9, accelerationPoint: -2.5 },
  { name: '岩手県', shortName: '岩手', x: 9, y: 2, population2015: 1279594, population2020: 1210534, population2025: 1125502, changeRate2015To2020: -5.4, changeRate2020To2025: -7.0, accelerationPoint: -1.6 },
  { name: '宮城県', shortName: '宮城', x: 8, y: 3, population2015: 2333899, population2020: 2301996, population2025: 2227240, changeRate2015To2020: -1.4, changeRate2020To2025: -3.2, accelerationPoint: -1.9 },
  { name: '秋田県', shortName: '秋田', x: 7, y: 2, population2015: 1023119, population2020: 959502, population2025: 882100, changeRate2015To2020: -6.2, changeRate2020To2025: -8.1, accelerationPoint: -1.8 },
  { name: '山形県', shortName: '山形', x: 7, y: 3, population2015: 1123891, population2020: 1068027, population2025: 993127, changeRate2015To2020: -5.0, changeRate2020To2025: -7.0, accelerationPoint: -2.0 },
  { name: '福島県', shortName: '福島', x: 8, y: 4, population2015: 1914039, population2020: 1833152, population2025: 1711937, changeRate2015To2020: -4.2, changeRate2020To2025: -6.6, accelerationPoint: -2.4 },
  { name: '茨城県', shortName: '茨城', x: 8, y: 5, population2015: 2916976, population2020: 2867009, population2025: 2791207, changeRate2015To2020: -1.7, changeRate2020To2025: -2.6, accelerationPoint: -0.9 },
  { name: '栃木県', shortName: '栃木', x: 7, y: 5, population2015: 1974255, population2020: 1933146, population2025: 1864833, changeRate2015To2020: -2.1, changeRate2020To2025: -3.5, accelerationPoint: -1.5 },
  { name: '群馬県', shortName: '群馬', x: 6, y: 5, population2015: 1973115, population2020: 1939110, population2025: 1867582, changeRate2015To2020: -1.7, changeRate2020To2025: -3.7, accelerationPoint: -2.0 },
  { name: '埼玉県', shortName: '埼玉', x: 7, y: 6, population2015: 7266534, population2020: 7344765, population2025: 7287169, changeRate2015To2020: 1.1, changeRate2020To2025: -0.8, accelerationPoint: -1.9 },
  { name: '千葉県', shortName: '千葉', x: 8, y: 7, population2015: 6222666, population2020: 6284480, population2025: 6258512, changeRate2015To2020: 1.0, changeRate2020To2025: -0.4, accelerationPoint: -1.4 },
  { name: '東京都', shortName: '東京', x: 7, y: 7, population2015: 13515271, population2020: 14047594, population2025: 14246219, changeRate2015To2020: 3.9, changeRate2020To2025: 1.4, accelerationPoint: -2.5 },
  { name: '神奈川県', shortName: '神奈', x: 6, y: 7, population2015: 9126214, population2020: 9237337, population2025: 9193657, changeRate2015To2020: 1.2, changeRate2020To2025: -0.5, accelerationPoint: -1.7 },
  { name: '新潟県', shortName: '新潟', x: 5, y: 4, population2015: 2304264, population2020: 2201272, population2025: 2068476, changeRate2015To2020: -4.5, changeRate2020To2025: -6.0, accelerationPoint: -1.6 },
  { name: '富山県', shortName: '富山', x: 4, y: 5, population2015: 1066328, population2020: 1034814, population2025: 985675, changeRate2015To2020: -3.0, changeRate2020To2025: -4.7, accelerationPoint: -1.8 },
  { name: '石川県', shortName: '石川', x: 3, y: 5, population2015: 1154008, population2020: 1132526, population2025: 1088221, changeRate2015To2020: -1.9, changeRate2020To2025: -3.9, accelerationPoint: -2.1 },
  { name: '福井県', shortName: '福井', x: 3, y: 6, population2015: 786740, population2020: 766863, population2025: 729386, changeRate2015To2020: -2.5, changeRate2020To2025: -4.9, accelerationPoint: -2.4 },
  { name: '山梨県', shortName: '山梨', x: 6, y: 6, population2015: 834930, population2020: 809974, population2025: 779912, changeRate2015To2020: -3.0, changeRate2020To2025: -3.7, accelerationPoint: -0.7 },
  { name: '長野県', shortName: '長野', x: 5, y: 5, population2015: 2098804, population2020: 2048011, population2025: 1954950, changeRate2015To2020: -2.4, changeRate2020To2025: -4.5, accelerationPoint: -2.1 },
  { name: '岐阜県', shortName: '岐阜', x: 4, y: 6, population2015: 2031903, population2020: 1978742, population2025: 1891489, changeRate2015To2020: -2.6, changeRate2020To2025: -4.4, accelerationPoint: -1.8 },
  { name: '静岡県', shortName: '静岡', x: 5, y: 7, population2015: 3700305, population2020: 3633202, population2025: 3468845, changeRate2015To2020: -1.8, changeRate2020To2025: -4.5, accelerationPoint: -2.7 },
  { name: '愛知県', shortName: '愛知', x: 4, y: 7, population2015: 7483128, population2020: 7542415, population2025: 7449403, changeRate2015To2020: 0.8, changeRate2020To2025: -1.2, accelerationPoint: -2.0 },
  { name: '三重県', shortName: '三重', x: 4, y: 8, population2015: 1815865, population2020: 1770254, population2025: 1694896, changeRate2015To2020: -2.5, changeRate2020To2025: -4.3, accelerationPoint: -1.7 },
  { name: '滋賀県', shortName: '滋賀', x: 3, y: 7, population2015: 1412916, population2020: 1413610, population2025: 1392439, changeRate2015To2020: 0.0, changeRate2020To2025: -1.5, accelerationPoint: -1.5 },
  { name: '京都府', shortName: '京都', x: 2, y: 7, population2015: 2610353, population2020: 2578087, population2025: 2502747, changeRate2015To2020: -1.2, changeRate2020To2025: -2.9, accelerationPoint: -1.7 },
  { name: '大阪府', shortName: '大阪', x: 2, y: 8, population2015: 8839469, population2020: 8837685, population2025: 8764578, changeRate2015To2020: -0.0, changeRate2020To2025: -0.8, accelerationPoint: -0.8 },
  { name: '兵庫県', shortName: '兵庫', x: 1, y: 7, population2015: 5534800, population2020: 5465002, population2025: 5323825, changeRate2015To2020: -1.3, changeRate2020To2025: -2.6, accelerationPoint: -1.3 },
  { name: '奈良県', shortName: '奈良', x: 2, y: 9, population2015: 1364316, population2020: 1324473, population2025: 1269180, changeRate2015To2020: -2.9, changeRate2020To2025: -4.2, accelerationPoint: -1.3 },
  { name: '和歌山県', shortName: '和歌', x: 1, y: 9, population2015: 963579, population2020: 922584, population2025: 864262, changeRate2015To2020: -4.3, changeRate2020To2025: -6.3, accelerationPoint: -2.1 },
  { name: '鳥取県', shortName: '鳥取', x: 0, y: 6, population2015: 573441, population2020: 553407, population2025: 523732, changeRate2015To2020: -3.5, changeRate2020To2025: -5.4, accelerationPoint: -1.9 },
  { name: '島根県', shortName: '島根', x: -1, y: 6, population2015: 694352, population2020: 671126, population2025: 629460, changeRate2015To2020: -3.3, changeRate2020To2025: -6.2, accelerationPoint: -2.9 },
  { name: '岡山県', shortName: '岡山', x: 0, y: 7, population2015: 1921525, population2020: 1888432, population2025: 1808664, changeRate2015To2020: -1.7, changeRate2020To2025: -4.2, accelerationPoint: -2.5 },
  { name: '広島県', shortName: '広島', x: -1, y: 7, population2015: 2843990, population2020: 2799702, population2025: 2683399, changeRate2015To2020: -1.6, changeRate2020To2025: -4.2, accelerationPoint: -2.6 },
  { name: '山口県', shortName: '山口', x: -2, y: 7, population2015: 1404729, population2020: 1342059, population2025: 1264006, changeRate2015To2020: -4.5, changeRate2020To2025: -5.8, accelerationPoint: -1.4 },
  { name: '徳島県', shortName: '徳島', x: 0, y: 9, population2015: 755733, population2020: 719559, population2025: 675489, changeRate2015To2020: -4.8, changeRate2020To2025: -6.1, accelerationPoint: -1.3 },
  { name: '香川県', shortName: '香川', x: 0, y: 8, population2015: 976263, population2020: 950244, population2025: 907725, changeRate2015To2020: -2.7, changeRate2020To2025: -4.5, accelerationPoint: -1.8 },
  { name: '愛媛県', shortName: '愛媛', x: -1, y: 9, population2015: 1385262, population2020: 1334841, population2025: 1260088, changeRate2015To2020: -3.6, changeRate2020To2025: -5.6, accelerationPoint: -2.0 },
  { name: '高知県', shortName: '高知', x: -1, y: 10, population2015: 728276, population2020: 691527, population2025: 643437, changeRate2015To2020: -5.0, changeRate2020To2025: -7.0, accelerationPoint: -1.9 },
  { name: '福岡県', shortName: '福岡', x: -4, y: 7, population2015: 5101556, population2020: 5135214, population2025: 5081879, changeRate2015To2020: 0.7, changeRate2020To2025: -1.0, accelerationPoint: -1.7 },
  { name: '佐賀県', shortName: '佐賀', x: -5, y: 8, population2015: 832832, population2020: 811442, population2025: 781214, changeRate2015To2020: -2.6, changeRate2020To2025: -3.7, accelerationPoint: -1.2 },
  { name: '長崎県', shortName: '長崎', x: -6, y: 8, population2015: 1377187, population2020: 1312317, population2025: 1232190, changeRate2015To2020: -4.7, changeRate2020To2025: -6.1, accelerationPoint: -1.4 },
  { name: '熊本県', shortName: '熊本', x: -5, y: 9, population2015: 1786170, population2020: 1738301, population2025: 1678090, changeRate2015To2020: -2.7, changeRate2020To2025: -3.5, accelerationPoint: -0.8 },
  { name: '大分県', shortName: '大分', x: -4, y: 8, population2015: 1166338, population2020: 1123852, population2025: 1076875, changeRate2015To2020: -3.6, changeRate2020To2025: -4.2, accelerationPoint: -0.5 },
  { name: '宮崎県', shortName: '宮崎', x: -4, y: 10, population2015: 1104069, population2020: 1069576, population2025: 1018904, changeRate2015To2020: -3.1, changeRate2020To2025: -4.7, accelerationPoint: -1.6 },
  { name: '鹿児島県', shortName: '鹿児', x: -5, y: 10, population2015: 1648177, population2020: 1588256, population2025: 1512969, changeRate2015To2020: -3.6, changeRate2020To2025: -4.7, accelerationPoint: -1.1 },
  { name: '沖縄県', shortName: '沖縄', x: -7, y: 11, population2015: 1433566, population2020: 1467480, population2025: 1468220, changeRate2015To2020: 2.4, changeRate2020To2025: 0.1, accelerationPoint: -2.3 },
]
