import{m as T,S as g,a as n,k,f as d,M as z,q as r,c as p,b as S,r as C,B as v,d as x,E as y,F as _,l as m,j as I}from"./index-DWIUrL3h.js";import{V as l}from"./VorbisParser-Ci8AFAC1.js";class F extends T("Opus"){}class N{constructor(e){if(this.len=e,e<19)throw new F("ID-header-page 0 should be at least 19 bytes long")}get(e,a){return{magicSignature:new g(8,"ascii").get(e,a+0),version:n.get(e,a+8),channelCount:n.get(e,a+9),preSkip:k.get(e,a+10),inputSampleRate:d.get(e,a+12),outputGain:k.get(e,a+16),channelMapping:n.get(e,a+18)}}}class H extends l{constructor(e,a,s){super(e,a),this.tokenizer=s,this.idHeader=null,this.lastPos=-1}parseFirstPage(e,a){if(this.metadata.setFormat("codec","Opus"),this.idHeader=new N(a.length).get(a,0),this.idHeader.magicSignature!=="OpusHead")throw new F("Illegal ogg/Opus magic-signature");this.metadata.setFormat("sampleRate",this.idHeader.inputSampleRate),this.metadata.setFormat("numberOfChannels",this.idHeader.channelCount)}async parseFullPage(e){switch(new g(8,"ascii").get(e,0)){case"OpusTags":await this.parseUserCommentList(e,8),this.lastPos=this.tokenizer.position-e.length;break}}calculateDuration(e){if(this.metadata.format.sampleRate&&e.absoluteGranulePosition>=0){const a=e.absoluteGranulePosition-this.idHeader.preSkip;if(this.metadata.setFormat("numberOfSamples",a),this.metadata.setFormat("duration",a/48e3),this.lastPos!==-1&&this.tokenizer.fileInfo.size&&this.metadata.format.duration){const s=this.tokenizer.fileInfo.size-this.lastPos;this.metadata.setFormat("bitrate",8*s/this.metadata.format.duration)}}}}const E={len:80,get:(t,e)=>({speex:new g(8,"ascii").get(t,e+0),version:z(new g(20,"ascii").get(t,e+8)),version_id:r.get(t,e+28),header_size:r.get(t,e+32),rate:r.get(t,e+36),mode:r.get(t,e+40),mode_bitstream_version:r.get(t,e+44),nb_channels:r.get(t,e+48),bitrate:r.get(t,e+52),frame_size:r.get(t,e+56),vbr:r.get(t,e+60),frames_per_packet:r.get(t,e+64),extra_headers:r.get(t,e+68),reserved1:r.get(t,e+72),reserved2:r.get(t,e+76)})},G=p("music-metadata:parser:ogg:speex");class U extends l{constructor(e,a,s){super(e,a),this.tokenizer=s}parseFirstPage(e,a){G("First Ogg/Speex page");const s=E.get(a,0);this.metadata.setFormat("codec",`Speex ${s.version}`),this.metadata.setFormat("numberOfChannels",s.nb_channels),this.metadata.setFormat("sampleRate",s.rate),s.bitrate!==-1&&this.metadata.setFormat("bitrate",s.bitrate)}}const b={len:42,get:(t,e)=>({id:new g(7,"ascii").get(t,e),vmaj:n.get(t,e+7),vmin:n.get(t,e+8),vrev:n.get(t,e+9),vmbw:S.get(t,e+10),vmbh:S.get(t,e+17),nombr:C.get(t,e+37),nqual:n.get(t,e+40)})},c=p("music-metadata:parser:ogg:theora");class L{constructor(e,a,s){this.metadata=e,this.tokenizer=s}async parsePage(e,a){e.headerType.firstPage&&await this.parseFirstPage(e,a)}async flush(){c("flush")}calculateDuration(e){c("duration calculation not implemented")}async parseFirstPage(e,a){c("First Ogg/Theora page"),this.metadata.setFormat("codec","Theora");const s=b.get(a,0);this.metadata.setFormat("bitrate",s.nombr)}}class O extends T("Ogg"){}const i=p("music-metadata:parser:ogg");class u{static sum(e,a,s){const o=new DataView(e.buffer,0);let P=0;for(let h=a;h<a+s;++h)P+=o.getUint8(h);return P}constructor(e){this.len=e.page_segments}get(e,a){return{totalPageSize:u.sum(e,a,this.len)}}}class w extends v{constructor(){super(...arguments),this.header=null,this.pageNumber=0,this.pageConsumer=null}async parse(){i("pos=%s, parsePage()",this.tokenizer.position);try{let e;do{if(e=await this.tokenizer.readToken(w.Header),e.capturePattern!=="OggS")throw new O("Invalid Ogg capture pattern");this.metadata.setFormat("container","Ogg"),this.header=e,this.pageNumber=e.pageSequenceNo,i("page#=%s, Ogg.id=%s",e.pageSequenceNo,e.capturePattern);const a=await this.tokenizer.readToken(new u(e));i("totalPageSize=%s",a.totalPageSize);const s=await this.tokenizer.readToken(new x(a.totalPageSize));if(i("firstPage=%s, lastPage=%s, continued=%s",e.headerType.firstPage,e.headerType.lastPage,e.headerType.continued),e.headerType.firstPage){const o=new TextDecoder("ascii").decode(s.subarray(0,7));switch(o){case"vorbis":i("Set page consumer to Ogg/Vorbis"),this.pageConsumer=new l(this.metadata,this.options);break;case"OpusHea":i("Set page consumer to Ogg/Opus"),this.pageConsumer=new H(this.metadata,this.options,this.tokenizer);break;case"Speex  ":i("Set page consumer to Ogg/Speex"),this.pageConsumer=new U(this.metadata,this.options,this.tokenizer);break;case"fishead":case"\0theora":i("Set page consumer to Ogg/Theora"),this.pageConsumer=new L(this.metadata,this.options,this.tokenizer);break;default:throw new O(`gg audio-codec not recognized (id=${o})`)}}await this.pageConsumer.parsePage(e,s)}while(!e.headerType.lastPage)}catch(e){if(e instanceof Error)e instanceof y?(this.metadata.addWarning("Last OGG-page is not marked with last-page flag"),i("End-of-stream"),this.metadata.addWarning("Last OGG-page is not marked with last-page flag"),this.header&&this.pageConsumer.calculateDuration(this.header)):e.message.startsWith("FourCC")&&this.pageNumber>0&&(this.metadata.addWarning("Invalid FourCC ID, maybe last OGG-page is not marked with last-page flag"),await this.pageConsumer.flush());else throw e}}}w.Header={len:27,get:(t,e)=>({capturePattern:_.get(t,e),version:n.get(t,e+4),headerType:{continued:m(t,e+5,0),firstPage:m(t,e+5,1),lastPage:m(t,e+5,2)},absoluteGranulePosition:Number(I.get(t,e+6)),streamSerialNumber:d.get(t,e+14),pageSequenceNo:d.get(t,e+18),pageChecksum:d.get(t,e+22),page_segments:n.get(t,e+26)})};export{O as OggContentError,w as OggParser,u as SegmentTable};
