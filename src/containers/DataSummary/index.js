import React, { useState, useEffect, useRef } from 'react';
import GenomicInfo from './GenomicInformation';
import ClinicalInformation from './ClinicalInformation';
import AdvancedInfo from './AdvanceAnalysis/';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default function DataSummary() {
  const elementRef = useRef(null);
  const [menuItems, setMenuItems] = useState([]);
  let { tab } = useParams();
  tab = tab ? tab : 'Clinical_Information';

  const toggleTab = () => {
    let tabsContainer = document.querySelector('#tabs');
    let tabTogglers = tabsContainer.querySelectorAll('a');
    tabTogglers.forEach(function (toggler) {
      toggler.addEventListener('click', function (e) {
        for (var i = 0; i < tabTogglers.length; i++) {
          tabTogglers[i].parentElement.classList.remove(
            'border-blue-400',
            'border-b',
            '-mb-px',
            'opacity-100'
          );
        }
        e.target.parentElement.classList.add(
          'border-blue-400',
          'border-b-4',
          '-mb-px',
          'opacity-100'
        );
      });
    });
  };

  useEffect(() => {
    let tabsContainer = document.querySelector('#tabs');
    let tabTogglers = tabsContainer.querySelectorAll('li');
    tabTogglers.forEach(function (toggler) {
      let href = toggler.children[0].href;
      href = href.split('/');
      toggler.classList.remove('border-blue-400', 'border-b', '-mb-px', 'opacity-100');
      if (href.includes(tab)) {
        toggler.classList.add('border-blue-400', 'border-b-4', '-mb-px', 'opacity-100');
      }
    });
  }, [tab]);

  const LoadChart = (type) => {
    switch (type) {
      case 'Clinical_Information':
        return <ClinicalInformation />;
      case 'Genomic_Information':
        return <GenomicInfo />;
      case 'Advanced_Information':
        return <AdvancedInfo />;
      default:
        return '';
    }
  };

  useEffect(() => {
    let l = ['Clinical_Information', 'Genomic_Information', 'Advanced_Information'];
    let tmp = [];
    let name = {
      Clinical_Information: 'Clinical Information',
      Genomic_Information: 'Genomic Information',
      Advanced_Information: 'Advanced Information'
    };
    l.forEach((element) => {
      let classes = 'px-4 py-2 font-semibold rounded-t opacity-50 ';
      if (tab === element) {
        classes = classes + ' border-blue-400 border-b-4 -mb-px opacity-100';
      }
      tmp.push(
        <li key={element} className={classes}>
          <Link className="capitalize" to={`/summary/${element}/`}>
            <FormattedMessage id={element} defaultMessage={name[element]} />
          </Link>
        </li>
      );
    });
    setMenuItems(tmp);
  }, []);

  return (
    <div className="header">
      <section className="relative  items-center  bg-cover bg-center bg-white border-t justify-center">
        <nav className=" px-8 pt-2 shadow-md">
          <ul
            id="tabs"
            className="inline-flex justify-center w-full px-1 pt-2 text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md"
            onClick={(e) => toggleTab(e)}
          >
            {menuItems}
          </ul>
        </nav>
      </section>
      <section>
        <div id="tab-contents" className="block " ref={elementRef}>
          {LoadChart(tab)}
        </div>
      </section>
    </div>
  );
}
