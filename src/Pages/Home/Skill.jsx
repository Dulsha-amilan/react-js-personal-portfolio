import React from 'react';

const SkillsSection = () => {
  return (
    <section className="skills" id="skills">
      <h2 className="heading">
        My<span>Skills</span>
      </h2>
      <div className="skills-row">
        <div className="skills-column">
          <h3 className="title">Coding Skills</h3>
          <div className="skills-box">
            <div className="skills-content">
            <h3>HTML</h3><span>98%</span>
                        <div class="bar"><span></span></div>
            </div>
          </div>
        </div>
        <div className="skills-column">
          <h3 className="title">Professional Skills</h3>
          <div className="skills-box">
            <div className="skills-content">
              {/* Add your progress bars and content here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
