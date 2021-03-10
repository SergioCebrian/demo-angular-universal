import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/* Angular Universal empieza a ejecutar el cliente en cuanto puede y 
   posiblemente el estado de TransferState aún no está disponible. 
   Por ello hay que retrasar la carga hasta que el DOM esté cargado.
*/

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
