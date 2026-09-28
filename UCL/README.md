# Urban Consultants Ltd. — GitHub Pages Website

A responsive, light-theme, static corporate website for Urban Consultants Ltd.

## Folder structure

```text
urban-consultants-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── images/
        ├── logo.jpg
        ├── img-1.jpg
        ├── img-2.jpg
        ├── img-3.jpg
        ├── img-4.jpg
        ├── img-5.jpg
        └── img-6.jpg
```

## Add your images

The website already points to these filenames. Put your real images in `assets/images/` using the names above. If an image is missing, the page automatically shows a designed fallback instead of a broken-image icon.

Suggested use:
- `img-1.jpg` — Hero / flagship project
- `img-2.jpg` — Urban planning / development project
- `img-3.jpg` — Traffic Impact Analysis / traffic survey
- `img-4.jpg` — GIS / Remote Sensing / thematic mapping
- `img-5.jpg` — Topographic survey / fieldwork
- `img-6.jpg` — Landscape / public realm design

## Edit contact details

Open `index.html` and search for `EDIT THESE CONTACT DETAILS`.
Replace:
- `info@urbanconsultantsltd.com`
- `+880 1XXX-XXXXXX`
- `Dhaka, Bangladesh`

## Publish on GitHub Pages

1. Create a GitHub repository, e.g. `urban-consultants-website`.
2. Upload `index.html`, `style.css`, `script.js`, `README.md` and the `assets` folder.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save. GitHub will generate the public Pages URL.

No Node.js, PHP, database or build process is required.
