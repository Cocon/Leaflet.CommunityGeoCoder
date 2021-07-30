# Leaflet.CommunityGeoCoder

株式会社 Geolonia 様の[オープンソース住所正規化ライブラリ](https://github.com/geolonia/normalize-japanese-addresses)を活用し、
Leaflet.js 地図に住所検索機能を追加するプラグインです。  
検索窓に日本国内の住所を入力するとその場所に地図が遷移します。

## Demo

開発中

## Usage

Leaflet 1.x 系に対応しています。

### Basic usage

```typescript
import L from "leaflet";
import { GeoCoder } from "leaflet.communitygeocoder";

const map = new L.map("map");
const geoCoderControl = new GeoCoder();
geoCoderControl.addTo(map);
```

### Without control

```typescript
import L from "leaflet";
import { GeoCoder } from "leaflet.communitygeocoder";

const map = new L.map("map");
const geoCoder = GeoCoder.geoCoder(map);
geoCoder("東京都千代田区霞が関1-3-1");
```

## Author

YUUKIToriyama([@CoconMap](https://mobile.twitter.com/CoconMap/))

## Thanks to

- [geolonia/japanese-addresses](https://github.com/geolonia/japanese-addresses)
- [geolonia/normalize-japanese-addresses](https://github.com/geolonia/normalize-japanese-addresses)
- [geolonia/community-geocoder](https://github.com/geolonia/community-geocoder)
