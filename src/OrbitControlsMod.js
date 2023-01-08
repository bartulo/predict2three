import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {Raycaster, Vector2, DataTexture, RGBAFormat} from 'three/src/Three';

class OrbitControlsMod extends OrbitControls {
  constructor ( object, domElement, app ) {
    super( object, domElement );
    this.value = 0;
    this.mouse = new Vector2( 0, 0 );
    this.app = app;
    addEventListener('mousemove', event => {
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    })

    addEventListener('keypress', key => {
      if ( key.key == 'f' ) {
        this.keyPressed();
      }

    });
  }

  keyPressed () {
    const raycaster = new Raycaster();
    let fData = this.app.fireData;
    raycaster.setFromCamera( this.mouse, this.app.camera )
    const intersect = raycaster.intersectObjects( this.app.scene.children );

    const fireX = parseInt( ( intersect[0].point.x + 1 ) * 255 /2 );
    const fireY = parseInt( ( intersect[0].point.z + 1 ) * 255 /2 );

    const ident = ( 256 * fireY + fireX ) * 4;

    fData[ident] = 10;
    let fDataTexture = new DataTexture( fData, 256, 256, RGBAFormat
    );
    fDataTexture.flipY = true;

    this.app.fireSpreadMaterial.uniforms.fire.value = fDataTexture;
  }
}

export { OrbitControlsMod }
