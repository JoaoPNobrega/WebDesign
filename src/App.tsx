import Signature from "./components/Signature";
import ContactNotch from "./components/ContactNotch";
import usePortfolioNavigation from "./components/usePortfolioNavigation";
import RedesignSections from "./components/redesign/RedesignSections";
import SiteFooter from "./components/SiteFooter";

export default function App() {
  const navigation = usePortfolioNavigation();
  return (
    <main>
      <ContactNotch onAbout={navigation.openAbout} aboutActive={navigation.aboutActive} aboutBusy={navigation.transitioning} />
      <section className="hero" id="sobre" aria-labelledby="hero-name">
        <div className="hero__scene">
        <div className="hero__identity">
          <h1 className="hero__name" id="hero-name" aria-label="João Pedro — Software Developer">
            <span className="hero__first-name" data-text="SOFTWARE">SOFTWARE</span>
            <span className="hero__last-name" data-text="DEVELOPER">DEVELOPER</span>
          </h1>
        </div>
        <div className="hero__portrait-stage">
        <img
          className="hero__portrait"
          src="/assets/joao-pedro-hero-cutout.png"
          alt="João Pedro usando uma jaqueta bege"
          width={1122}
          height={1402}
          loading="eager"
        />
        </div>
        </div>
        <Signature />
      </section>
      {navigation.unlocked && <RedesignSections onNavigate={navigation.scrollToTarget} />}
      {navigation.unlocked && <SiteFooter />}
    </main>
  );
}
