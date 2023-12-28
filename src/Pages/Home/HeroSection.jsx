import Animation from './Animation'

export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hey, I'm Dulsha</p>
          <h1 className="hero--section--title">
            {/* <span className="hero--section-title--color">Full Stack</span>{" "}
            <br />
            Developer */}
            <div className='animation'><Animation/></div>
            
          </h1>
          <br></br>
          <br></br>
          <p className="hero--section-description">
          Until now, I have successfully balanced my studies , work and other
          commitments. Having the capability of working smartly,learning fast
          and to work under pressure. My objective is to become a self motivated
          employee and a active team player
          </p>
        </div>
        <button className="btn btn-primary">Get In Touch</button>
      </div>
      <div className="hero--section--img">
        <img src="./img/new.png" alt="Hero Section" />
      </div>
    </section>
  );
}
