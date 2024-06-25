# Kuri Rework Changelog

## Functional Rework

1. **Exclude Page Mildom Clip and Twitch Clip**
   - Mildom Clip page doesn't have UI control, so it needs a separate script file to attach the screenshot.
   - Twitch Clip page has CORS permission issues; video to canvas on these pages results in a tainted canvas. I don't know how to fix that yet (maybe later if I get some downtime).

2. **Streamline Screenshot Button Injection**
   - Injecting the screenshot button is now streamlined instead of being different for each page. It's now a two-step timing injection (as the original script noted some streaming sites refresh the video player themselves). The first injection repeats every 500ms until successful, then switches to a watcher injection every 5000ms.

3. **Merge Image Download Functionality**
   - All related functions have been moved to Utils. As a result, in the configuration-rework branch, the "Save to Clipboard" option is not working. I'm unsure of the best way to split the branch.

4. **Merge File Name Generator**
   - The file name only needs the title, using the template `{ss}_{datetime}_{title}{-optional time}.png`.

## Sites Excluded from Functional Rework

1. **spwn** (don't have an account)
2. **zan-live** (don't have an account)
3. **nico-nico** (down due to ransomware, don't know when it will be up)

## Configuration UI Rework

1. **Remove Bootstrap and jQuery**
   - Bootstrap is too big for simple pages and jQuery is unnecessary since VanillaJS covers all needed functionality.

   - Bootstrap ➡️ [Picnic CSS](https://picnicss.com/)
   - jQuery ➡️ Removed
   - Toastify ➡️ Added

2. **Add "Copy to Clipboard" Option**

3. **Show Small Information Toast When Saving Configuration**

*Note: jQuery files will be removed during the Functional Rework later.*

## Configuration Popup Feature

Added a popup configuration that appears when clicking the extension. It was copied and modified from `option.html` to fit a 400px x 300px window size.

## Known Issues

1. On Twitch Clip pages, the canvas can't copy from the video due to CORS policy, resulting in a tainted canvas that prevents taking screenshots from those canvases.

=====

# スクショボタン

動画配信サイト上の動画のスクリーンショットを１クリックで撮影できるchrome拡張機能

対応している動画配信サイト
- YouTube
- OPENREC.tv
- SHOWROOM
- Mildom
- Twitch
- SPWN

### インストール後の画面イメージ
- YouTube
![youtube](https://user-images.githubusercontent.com/57102101/92698927-eff27400-f387-11ea-8197-886d789bf8c8.png)
- OPENREC.tv
![openrec](https://user-images.githubusercontent.com/57102101/92698923-eec14700-f387-11ea-8894-06d36f61d7bf.png)
- SHOWROOM
![showroom](https://user-images.githubusercontent.com/57102101/92698925-eec14700-f387-11ea-9008-ce07eba76095.png)
- Mildom
![mildom](https://user-images.githubusercontent.com/57102101/92698922-ed901a00-f387-11ea-8656-091d6f142dd1.png)
- Twitch
![twitch](https://user-images.githubusercontent.com/57102101/92698926-ef59dd80-f387-11ea-8f53-ae19922bb74a.png)

