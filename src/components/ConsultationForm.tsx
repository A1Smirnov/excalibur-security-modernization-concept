import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { services } from '../data/services';
export default function ConsultationForm() {
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);
  const [service, setService] = useState('');
  useEffect(() => { setReady(true); const choice = new URLSearchParams(window.location.search).get('service'); if (services.some(s => s.slug === choice)) setService(choice!); }, []);
  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setComplete(true);
  }
  if (complete) return <div className="form-success" role="status" tabIndex={-1} ref={element => element?.focus()}><span className="success-icon" aria-hidden="true">✓</span><p className="eyebrow red">DEMONSTRATION COMPLETE</p><h2>You’ve reached<br/>the next step.</h2><p>In a live website, this is where your consultation request would be confirmed. No data was sent or saved.</p><button className="button" onClick={() => setComplete(false)}>Try the form again <span aria-hidden="true">↗</span></button></div>;
  return <form onSubmit={submit} className="consultation-form"><p className="form-note" id="demo-note">Demonstration only. Use sample details. Nothing is sent or saved.</p><fieldset disabled={!ready} aria-describedby="demo-note"><legend className="sr-only">Consultation details</legend><div className="form-row"><label>Your name<input name="name" autoComplete="off" placeholder="Alex Morgan" required maxLength={100} pattern=".*\S.*" /></label><label>Email address<input name="email" type="email" autoComplete="off" placeholder="alex@example.com" required maxLength={254}/></label></div><label>What can we help with?<select name="service" required value={service} onChange={e => setService(e.target.value)}><option value="" disabled>Select a service</option>{services.map(s => <option key={s.slug} value={s.slug}>{s.title}</option>)}<option value="not-sure">I’d like some guidance</option></select></label><label>A little about your needs <span className="optional">(optional)</span><textarea name="message" rows={4} maxLength={1500} placeholder="The type of property or event, location, and timing…"/></label><button type="submit" className="button">Preview consultation request <span aria-hidden="true">↗</span></button></fieldset><noscript>This demo form needs JavaScript. No information can be submitted.</noscript></form>;
}
