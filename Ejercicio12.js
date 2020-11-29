class Controller {
    constructor(fileElement, parentElement) {
        this.fileElement = fileElement;
        this.parentElement = parentElement;
        const p = document.createElement('p');
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            p.append('Este navegador soporta el API File');
        }
        else p.append('¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!');
        parentElement.append(p);
    }
    get files() {
        return Array.from(this.fileElement.files);
    }
    showFilesInfo() {
        this.parentElement.querySelectorAll('*').forEach(n => n.remove());
        const mainSection = document.createElement('section');
        const header = document.createElement('header');
        const h = document.createElement('h2');
        h.append('Info');
        header.append(h);
        mainSection.append(header);
        const pAll = document.createElement('p');
        pAll.append(`El tamaño total de los archivos es de ${this.calcTotalSize()} bytes`);
        mainSection.append(pAll);
        this.files.forEach(file => mainSection.append(this.fileSection(file)));
        this.parentElement.append(mainSection);
    }
    calcTotalSize() {
        this.totalSize = this.files.reduce((acc, file) => acc + file.length, 0);
    }
    fileSection(file) {
        const section = document.createElement('section');
        const header = document.createElement('header');
        const title = document.createElement('h3');
        const pData = document.createElement('p');
        title.append(file.name);
        header.append(title);
        section.append(header);
        pData.append(`Tamaño: ${file.size} bytes, Tipo: ${file.type}`);
        section.append(pData);
        if (file.type === 'text/plain' || file.type === 'text/xml' || file.type === 'application/json') {
            const contentSection = document.createElement('section');
            const cH = document.createElement('header');
            const h3 = document.createElement('h4');
            const c = document.createElement('code');
            file.text().then(t => c.append(t));
            h3.append('Contenido del fichero');
            cH.append(h3);
            contentSection.append(cH);
            contentSection.append(c);
            section.append(contentSection);
        }
        return section;
    }
}
const controller = new Controller(document.getElementById('upload'), document.getElementById('fileInfo'));