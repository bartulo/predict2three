import {
  TextureLoader, 
  FileLoader
} from 'three';

import { App } from './app.js';

import ros from './images/ros.asc';
import topo from './images/topo.png';
import asc from './images/mdt.asc';

let app = new App();

class AssetsLoader {

  constructor () {
  }

  init () {
    const loader = new TextureLoader();
    let promises = []

    promises.push( new Promise( resolve => {
      loader.load( topo, ( t ) => {
        app.topoTexture = t;

        resolve( );
      });
    }));

    const l = new FileLoader();

    promises.push( new Promise( resolve => {
      l.load( ros, data => {
        app.rosData = this.loadASC( data );

        resolve();
      });
    }));

    promises.push( new Promise( resolve => {
      l.load( asc, data => {
        app.mdtData = this.loadASC( data, 6 );

        for ( let i = 0; i < 400 * 400; i++ ) {
          app.terrainGeometry.attributes.position.array[ i * 3 + 2 ] = ( app.mdtData[ i ] / 5000. ) - 1;
        }

        resolve( );
      });
    }));

    promises.push( new Promise( resolve => {
      let a = new Uint8Array( 256 * 256 * 4 );
      for ( let i= 0; i < 256 * 256; i++ ) {
        a[ i * 4 ] = 0;
        a[ i * 4 + 1 ] = 0;
        a[ i * 4 + 2 ] = 0;
        a[ i * 4 + 3 ] = 255;
      }
      app.fireData = a;

      resolve( );
    }));

    Promise.all( promises ).then( () => {
      app.init();
    });

  }

  loadASC ( data ) {
    const d = data.split( /\r\n|\n/ );
    d.splice( 0, 6 );
    const e = d.map( elem => {
      return elem.substring( 1 );
    });
    const f = e.join( ' ' ).split( ' ' );
    f.pop();
    return new Float32Array( f );
  }


}

export { AssetsLoader }
export { app }
