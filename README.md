# Leaflet.CommunityGeoCoder

株式会社 Geolonia 様の[オープンソース住所正規化ライブラリ](https://github.com/geolonia/normalize-japanese-addresses)を活用し、
Leaflet.js 地図に住所検索機能を追加するプラグインです。  
検索窓に日本国内の住所を入力するとその場所に地図が遷移します。

## Demo

[こちら](https://cocon.github.io/Leaflet.CommunityGeoCoder/demo/)に簡単なデモとサンプルコードをご用意しています。

![demo page](https://i.imgur.com/7oXSJMr.png)

住所を入力してボタンを押すと、地図がその場所まで遷移します。
町名まで入れていただくとかなりピンポイントな地点まで移動します。
是非デモページを触って、株式会社 Geolonia 様の高性能なジオコーディングをお試しください！

## Usage

Leaflet 1.x 系に対応しています。

### From CDN (Recommended)

本プラグインは CDN からも利用可能です。サンプルコードは[こちら](https://cocon.github.io/Leaflet.CommunityGeoCoder/demo/)にございます。

```terminal
https://cdn.jsdelivr.net/npm/@coconmap/leaflet.communitygeocoder/dist/bundle.js
```

### From NPM (Experimental)

```bash
npm install @coconmap/leaflet.communitygeocoder
```

#### Basic usage

```typescript
import L from "leaflet";
import { GeoCoder } from "leaflet.communitygeocoder";

const map = new L.map("map");
const geoCoderControl = new GeoCoder();
geoCoderControl.addTo(map);
```

#### Without control

```typescript
import L from "leaflet";
import { GeoCoder } from "leaflet.communitygeocoder";

const map = new L.map("map");
const geoCoder = GeoCoder.on(map);
geoCoder("東京都千代田区霞が関1-3-1");
```

## Author

YUUKIToriyama([@CoconMap](https://mobile.twitter.com/CoconMap/))

## Thanks to

- [geolonia/community-geocoder](https://github.com/geolonia/community-geocoder)
- [geolonia/japanese-addresses](https://github.com/geolonia/japanese-addresses)
- [geolonia/normalize-japanese-addresses](https://github.com/geolonia/normalize-japanese-addresses)
