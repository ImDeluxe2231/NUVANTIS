const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),assert=require('assert');
(async()=>{
 const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist'),out=path.join(root,'VISTAS');fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--disable-gpu','--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:980}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://nuvantis-preview.test';
 await page.route(base+'/**',async r=>{const pathname=decodeURIComponent(new URL(r.request().url()).pathname);if(pathname.startsWith('/api/'))return r.fulfill({status:503,contentType:'application/json',body:JSON.stringify({message:'Servicio no conectado en revisión visual.'})});const candidate=path.join(dist,pathname),file=candidate.startsWith(dist+path.sep)&&fs.existsSync(candidate)&&fs.statSync(candidate).isFile()?candidate:path.join(dist,'index.html');const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream';await r.fulfill({contentType:mime,body:fs.readFileSync(file)});});
 await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(700);await page.screenshot({path:path.join(out,'01-inicio-premium.png')});
 await page.getByRole('button',{name:'Unidades',exact:true}).click();assert.equal(await page.locator('#unidades-menu a').count(),6);await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Definir una estrategia'}).click();assert.equal(await page.locator('.premium-finder-inner h3').innerText(),'Consulting');
 await page.getByRole('button',{name:/Industria y operaciones/}).click();assert.match(await page.locator('.premium-sector-panel h3').innerText(),/Visibilidad/);
 await page.getByRole('button',{name:'Buscar una unidad o servicio'}).click();await page.locator('#site-search').fill('ciberseguridad');await page.locator('#site-search').press('Enter');await page.locator('.unit-card').first().waitFor();assert.equal(await page.locator('.unit-card').count(),1);
 await page.goto(base,{waitUntil:'networkidle'});
 const cards=page.locator('.premium-unit-grid');await cards.scrollIntoViewIfNeeded();await page.waitForTimeout(1000);await cards.screenshot({path:path.join(out,'05-tarjetas-con-imagenes.png')});
 if(process.env.VISUAL_ONLY==='1'){await browser.close();console.log('Captura de tarjetas actualizada.');return;}
 assert.equal(await page.locator('.premium-unit-art .reference-art').count(),6);
 const carousel=page.locator('.technology-carousel');await carousel.scrollIntoViewIfNeeded();await page.mouse.move(5,5);await page.waitForTimeout(1000);await carousel.screenshot({path:path.join(out,'06-carrusel-tecnologico.png')});
 assert.equal(await page.locator('.tech-carousel-slide.active').count(),1);
 const firstSlide=await page.locator('.tech-carousel-slide.active').getAttribute('aria-label');
 await page.waitForTimeout(4200);
 assert.notEqual(await page.locator('.tech-carousel-slide.active').getAttribute('aria-label'),firstSlide,'Carousel should advance automatically');
 assert.equal(await page.locator('.tech-carousel-footer').count(),0);
 assert.equal(await carousel.getByRole('button').count(),0);
 assert.equal(await page.locator('.tech-carousel-slide:not(.active)[inert]').count(),5);
 const images=await page.locator('.premium-unit-art .reference-art').evaluateAll(nodes=>nodes.every(art=>art.getBoundingClientRect().width>0));assert(images,'Unit illustrations render');
 const routes=['/','/unidades','/servicios','/unidades/software','/unidades/intelligence','/unidades/analytics','/unidades/infrastructure','/unidades/consulting','/unidades/labs','/sectores','/nosotros','/proceso','/contacto','/muro-de-ideas','/proyectos','/recursos','/privacidad','/terminos'];
 for(const route of routes){await page.goto(base+route);await page.locator('h1').waitFor();assert(!((await page.locator('h1').innerText()).includes('no está disponible')),route);}
 await page.goto(base);for(let y=0;y<9000;y+=650){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(70);}await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(700);await page.screenshot({path:path.join(out,'02-inicio-completo.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});for(const route of routes){await page.goto(base+route);await page.locator('h1').waitFor();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+route);}
 await page.goto(base);await page.waitForTimeout(700);await page.screenshot({path:path.join(out,'03-inicio-movil.png')});await page.getByRole('button',{name:'Abrir menú'}).click();await page.getByRole('button',{name:'Unidades',exact:true}).click();await page.waitForTimeout(300);await page.screenshot({path:path.join(out,'04-menu-movil.png')});await page.locator('#unidades-menu a[href="/unidades/labs"]').click();await page.waitForURL('**/unidades/labs');assert.equal(await page.locator('.corporate-nav.open').count(),0);
 for (const width of [360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
   await page.setViewportSize({width,height:900});
   for (const route of ['/', '/unidades/software', '/contacto', '/proyectos', '/recursos']) {
     await page.goto(base + route);
     await page.locator('h1').waitFor();
     assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'overflow ' + route + ' @ ' + width);
   }
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base);assert.equal(await page.locator('.route-main section').first().locator('.reference-emblem .official-logo').evaluate(e=>getComputedStyle(e).animationName),'none');await page.locator('.technology-carousel').scrollIntoViewIfNeeded();await page.waitForTimeout(100);assert.equal(await page.locator('.tech-carousel-slide.active').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(out,'verificacion.json'),JSON.stringify({routes,errors,checks:['Six-unit menu','Need selector','Sector selector','Search','Mobile navigation','Mobile overflow','Reduced motion'],note:'Production bundle served by Playwright interceptor; API intentionally unavailable.'},null,2));
 console.log('OK: 18 rutas; menú, búsqueda, selectores, móvil y movimiento reducido. Sin errores JS.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

