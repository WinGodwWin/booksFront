export class Functions {
  fileChangeEvent(fileInput: any): any {
    let result = {
      fileError: null,
      ispdf: false,
      FileBase64: null,
      isFileSaved: false,
    };
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      //verification de la taille des fichiers
      if (fileInput.target.files[0].size > max_size) {
        result.fileError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return result;
      }
      //verification des types de fichiers
      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        result.fileError = 'Only Images are allowed ( JPG | PNG |PDF)';
        return result;
      }

      const reader = new FileReader();
      //si le fichier est une image
      if (fileInput.target.files[0].type !== 'application/pdf') {
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = (rs) => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];

            //si le fichier depasse la taille indiqué

            if (img_height > max_height && img_width > max_width) {
              result.fileError =
                'Maximum dimentions allowed ' +
                max_height +
                '*' +
                max_width +
                'px';
              return result;
            } else {
              const imgBase64Path = e.target.result;
              result.FileBase64 = imgBase64Path;
              result.isFileSaved = true;
            }
          };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      } else {
        reader.onload = (e: any) => {
          const pdfBase64Path = e.target.result;
          result.FileBase64 =
            'data:application/pdf;base64,' +
            this.arrayBufferToBase64(pdfBase64Path);
          result.isFileSaved = true;
          //this.file=result.FileBase64;
          //var base64String = "data:application/pdf;base64,"+this.arrayBufferToBase64(pdfBase64Path);
            };
        result.isFileSaved = true;
        result.ispdf = true;
        reader.readAsArrayBuffer(fileInput.target.files[0]);
      }
    }
    return result;
  }

  private convertBase64ToBlobData(
    base64Data: string,
    contentType: string = 'image/png',
    sliceSize = 512
  ) {
    try {
      const byteCharacters = atob(base64Data);

      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    } catch (error) {
      return String(error);
    }
  }

  public downloadImg(base64Content:any, filename:any, contentType:any) {
    const blobData = this.convertBase64ToBlobData(base64Content);

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //IE
      window.navigator.msSaveOrOpenBlob(blobData, filename);
    } else {
      // chrome
      const blob = new Blob([blobData], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    }
  }

  openImageInNewWindow(data: string) {
    var image = new Image();
    image.src = data;

    var w = window.open('');
    w.document.write(image.outerHTML);
  }

  openPdfInNewWindow(data, contentType) {
    const blobData = this.convertBase64ToBlobData(data, contentType, 2048);

    if (typeof blobData == 'string') {
      return blobData;
    }

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, 'pdfBase64.pdf');
    } else {
      let blob = new Blob([blobData], { type: contentType });
      let url = window.URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.target = '_blank';
      a.href = url;
      a.click();
    }

    return true;
  }

  /*function de conversion d'un ArrayBuffer en base64
     @param :buffer ArrayBuffer
    */
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /*function de conversion d'un ArrayBuffer en base64
    @param :base64 string
    */
  base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
