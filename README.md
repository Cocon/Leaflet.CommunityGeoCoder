# Leaflet.CommunityGeoCoder

Leaflet.js 地図に住所検索機能を追加するプラグインです。  
検索窓に日本国内の住所を入力するとその場所に地図が遷移します。

## Demo

[こちら](https://cocon.github.io/Leaflet.CommunityGeoCoder/demo/)に簡単なデモとサンプルコードをご用意しています。

![demo page](https://i.imgur.com/7oXSJMr.png)

住所を入力してボタンを押すと、地図がその場所まで遷移します。
町名まで入れていただくと、かなりピンポイントな地点まで移動します。  

なおこちらのサンプルでは、株式会社 Geolonia さんの[オープンソース住所正規化ライブラリ](https://github.com/geolonia/normalize-japanese-addresses)を使用しています。サンプルを触っていただき気に入っていただけましたら、Geoloniaさんの製品もぜひチェックしていただければと思います。

## Usage

Leaflet.CommunityGeocoder単体では住所の検索はできません。  
別途、住所正規化のライブラリをインストールしていただく必要があります。  
ここでは株式会社 Geolonia さんの`@geolonia/normalize-japanese-addresses`を用いたコードサンプルをご紹介します。

```bash
npm install @coconmap/leaflet.communitygeocoder
npm install @geolonia/normalize-japanese-addresses
```

```typescript
import L from "leaflet";
import { GeoCoder } from "@coconmap/leaflet.communitygeocoder";
import { normalize } from "@geolonia/normalize-japanese-addresses";

const map = new L.Map("map", {
    center: [35.4477712, 139.6425415],
    zoom: 13
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const geoCoderControl = new GeoCoder(normalize);
geoCoderControl.addTo(map);
```

また、検索フォームはいらない、という場合にはsearchメソッドのみを使うことができます。  
なおこの場合、searchメソッドを呼び出す前にonメソッドを使ってGeoCoderとLeaflet地図を関連づけておく必要があるので注意してください。

```typescript
const geoCoder = new GeoCoder(normalize);
geoCoder.on(map);
geoCoder.search("東京都千代田区霞が関1-3-1");
```

また、バンドラーを使わない場合はJsDelivrなどのCDNをご利用いただけます。

```text
https://cdn.jsdelivr.net/npm/@coconmap/leaflet.communitygeocoder/dist/bundle.js
```

## Development

GeoCoderクラスのコンストラクタ引数である、Normalizerの定義は次のようになっています。

```typescript
type Normalizer = (address: string, options?: any) => Promise<NormalizeResult>
interface NormalizeResult {
 lat: number | null,
 lng: number | null,
 pref: string,
 city: string,
 town: string,
 addr: string,
 level: number
}
```

この定義に準拠していさえすればどのようなライブラリでもお使いいただくことができます。  
もしこのような正規化ライブラリを開発中の方がおられましたら、Issue等で連絡いただけますと光栄です。

## Author

YUUKIToriyama([@CoconMap](https://mobile.twitter.com/CoconMap/))

## Thanks to

- [geolonia/community-geocoder](https://github.com/geolonia/community-geocoder)
- [geolonia/japanese-addresses](https://github.com/geolonia/japanese-addresses)
- [geolonia/normalize-japanese-addresses](https://github.com/geolonia/normalize-japanese-addresses)
