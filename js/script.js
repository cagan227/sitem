let siteBilgileri;

function hizmetleriYukle() {
    if (!siteBilgileri || !siteBilgileri.hizmetler) return;

    const container = document.getElementById('hizmetListesi');
    const arama = document.getElementById('arama');
    let orijinalHizmetler = [...siteBilgileri.hizmetler];

    function render(liste) {
        container.innerHTML = '';
        if (liste.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:#636e72;grid-column:1/-1;">Hizmet bulunamadı.</p>';
            return;
        }
        liste.forEach((hizmet, idx) => {
            const kart = document.createElement('div');
            kart.className = 'hizmet-kart';
            kart.innerHTML = `<h3>${hizmet.ad}</h3><p>${hizmet.aciklama.substring(0, 100)}...</p>`;
            kart.onclick = () => detayGoster(originalIndex(hizmet));
            container.appendChild(kart);
        });
    }

    function originalIndex(hizmet) {
        return orijinalHizmetler.findIndex(h => h.ad === hizmet.ad);
    }

    arama.addEventListener('input', function() {
        const terim = this.value.toLowerCase();
        const filtrelenmis = orijinalHizmetler.filter(h => h.ad.toLowerCase().includes(terim));
        render(filtrelenmis);
    });

    render(orijinalHizmetler);
}

function detayGoster(index) {
    const h = siteBilgileri.hizmetler[index];
    document.getElementById('modalBaslik').textContent = h.ad;
    document.getElementById('modalAciklama').textContent = h.aciklama;
    const galeri = document.getElementById('modalGaleri');
    galeri.innerHTML = '';
    if (h.fotolar && h.fotolar.length > 0) {
        h.fotolar.forEach(f => {
            const img = document.createElement('img');
            img.src = f;
            img.alt = h.ad;
            img.onerror = function() { this.style.display = 'none'; };
            galeri.appendChild(img);
        });
    } else {
        galeri.innerHTML = '<p style="color:#636e72;">Bu hizmete ait fotoğraf henüz eklenmemiş.</p>';
    }
    document.getElementById('hizmetModal').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const kapat = document.querySelector('.kapat');
    if (kapat) {
        kapat.addEventListener('click', function() {
            document.getElementById('hizmetModal').style.display = 'none';
        });
    }
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('hizmetModal')) {
            document.getElementById('hizmetModal').style.display = 'none';
        }
    });
});
