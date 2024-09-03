
import cardiology from '../images/cardiology-removebg-preview.png';
import hair from '../images/hair-loss-removebg-preview.png';
import neurology from '../images/neurology-removebg-preview.png';
import ophthalmology from '../images/ophthalmology.png';
import gland from '../images/thyroid-removebg-preview.png';
import cancer from '../images/cancercell.png'

export const services = [
  {
    name: "Neurology",
    desc: "Neurology focuses on the diagnosis and treatment of disorders related to the nervous system, which includes the brain, spinal cord, and peripheral nerves.",
    bgColor: "rgba(254, 182, 13, .2)",
    textColor: "#FEB60D",
    photo: neurology,
  },
  {
    name: "Heart and Vascular",
    desc: "Heart and vascular health refers to the study and treatment of conditions affecting the heart (cardiovascular system) and blood vessels (vascular system).",
    bgColor: "rgba(151, 113, 255, .2)",
    textColor: "#9771FF",
    photo: cardiology,
  },
  {
    name: "Ophthalmologist",
    desc: "An ophthalmologist specializes in the diagnosis, treatment, and management of eye disorders and vision problems.",
    bgColor: "rgba(1, 181, 197, .2)",
    textColor: "#01B5C5",
    photo: ophthalmology,
  },
  {
    name: "Endocrinologist",
    desc: "An endocrinologist specializes in the diagnosis and treatment of disorders related to the endocrine system, which is responsible for hormone production and regulation in the body.",
    bgColor: "rgba(1, 181, 197, .2)",
    textColor: "#01B5C5",
    photo: gland,
  },
  {
    name: "Cancer Care",
    desc: "Cancer care encompasses a comprehensive approach to the diagnosis, treatment, and support of individuals diagnosed with cancer.",
    bgColor: "rgba(254, 182, 13, .2)",
    textColor: "#FEB60D",
    photo: cancer,
  },
  {
    name: "Skin and Hair Treatment",
    desc: "Skin and hair treatment involves a variety of medical and cosmetic approaches to address conditions affecting the skin and hair.",
    bgColor: "rgba(151, 113, 255, .2)",
    textColor: "#9771FF",
    photo: hair,
  },
];
