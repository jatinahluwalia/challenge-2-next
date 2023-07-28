"use client"

import Image from 'next/image'
import './page.css'
import { useState, useRef } from 'react'
import Step from '@/components/step'

const steps = [
  {
    number: 1,
    detail: "YOUR INFO"
  },
  {
    number: 2,
    detail: "SELECT PLAN"
  },
  {
    number: 3,
    detail: "ADD-ONS"
  },
  {
    number: 4,
    detail: "SUMMARY"
  },
]

export default function Home() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [price, setPrice] = useState({
    arcade: "$9/mo",
    pro: "$12/mo",
    advanced: "$15/mo",
    offer: ""
  })
  const [planDetails, setPlanDetails] = useState({
    plan: "arcade",
    planDuration: "monthly",
    price: price["arcade"]
  })
  const [activeIndex, setActiveIndex] = useState(1)
  const [emptyFields, setEmptyFields] = useState([])
  const [error, setError] = useState()
  const [checked, setchecked] = useState("monthly")
  const checkboxRef = useRef(null)

  const handleDetailsChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  const handleRadioChange = (e) => {
    setPlanDetails({
      ...planDetails,
      plan: e.target.value,
      price: price[e.target.value]
    })
  }

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setchecked("yearly")
      setPrice({
        arcade: "$90/yr",
        pro: "$120/yr",
        advanced: "$150/yr",
        offer: "2 months free"
      })
      setPlanDetails({
        ...planDetails,
        planDuration: "yearly"
      })
    } else {
      setchecked("monthly")
      setPrice({
        arcade: "$9/mo",
        pro: "$12/mo",
        advanced: "$15/mo",
        offer: ""
      })
      setPlanDetails({
        ...planDetails,
        planDuration: "monthly"
      })
    }
  }

  const handleBackClick = () => {
    setActiveIndex(activeIndex - 1)

  }

  const handleNextClick = () => {
    if (activeIndex === 1) {
      setEmptyFields([])
      if (!details.name) {
        setEmptyFields(prev => [...prev, "name"])
        setError("This field is required")
      }
      if (!details.email) {
        setEmptyFields(prev => [...prev, "email"])
        setError("This field is required")
      }
      if (!details.phone) {
        setEmptyFields(prev => [...prev, "phone"])
        setError("This field is required")
      }
      if (!details.name || !details.email || !details.phone) return
    }
    setActiveIndex(activeIndex + 1)
  }

  const handleSubmit = () => {

  }


  return (
    <main className="multistep-form">
      <aside className='multistep-form__sidebar'>
        <Image
          src={"/assets/images/bg-sidebar-desktop.svg"}
          about='haha'
          alt='nothing'
          className='multistep-form__sidebar-img'
          layout='fill'
        />
        <div className="multistep-form__sidebar">
          <div className="steps">

            {steps.map(step => (
              <Step
                number={step.number}
                detail={step.detail}
                activeIndex={activeIndex}
                key={step.number}
              />
            ))}
          </div>
        </div>
      </aside>
      <div className="multistep-form__main">
        {activeIndex === 1 && (
          <>
            <h1>Personal info</h1>
            <p>Please provide your name, email address, and phone number.</p>
            <form className="step-1">
              <div type="text" className='input-box' >
                <div className='label-container'>
                  <label htmlFor="name">Name</label>
                  {emptyFields.includes("name") && <span className='error-text'>{error}</span>}
                </div>
                <input className={emptyFields.includes("name") ? "error-input" : ""} name='name' type="text" id="name" value={details.name} placeholder='e.g. Stephen King' onChange={handleDetailsChange} />
              </div>
              <div type="text" className='input-box' >
                <div className='label-container'>
                  <label htmlFor="email">Email Address</label>
                  {emptyFields.includes("email") && <span className='error-text'>{error}</span>}
                </div>
                <input className={emptyFields.includes("email") ? "error-input" : ""} name='email' type="email" id="email" value={details.email} placeholder='e.g. stephenking@lorem.com' onChange={handleDetailsChange} />
              </div>
              <div type="text" className='input-box' >
                <div className='label-container'>
                  <label htmlFor="phone">Phone Number</label>
                  {emptyFields.includes("phone") && <span className='error-text'>{error}</span>}
                </div>
                <input className={emptyFields.includes("phone") ? "error-input" : ""} name='phone' type="text" id="phone" value={details.phone} placeholder='e.g. +1 234 567 890' onChange={handleDetailsChange} />
              </div>
            </form>
          </>
        )}
        {activeIndex === 2 && (
          <>
            <h1>Select your plan</h1>
            <p>You have the option of monthly or yearly billing.</p>

            <form className="step-2">
              <div className="radio-container">
                <label className="radio-input-box" htmlFor='arcade'>
                  <input type="radio" name="plan" id="arcade" value="arcade" onClick={handleRadioChange} defaultChecked />
                  <Image
                    src="/assets/images/icon-arcade.svg"
                    height={40}
                    width={40}
                    alt='nothing'
                  />
                  <div className="radio-box-info">
                    <div className="radio-box-name">Arcade</div>
                    <div className="radio-box-detail">{price.arcade}</div>
                    {price.offer && <div className='offer'> {price.offer} </div>}
                  </div>
                </label>
                <label className="radio-input-box" htmlFor='advanced'>
                  <input type="radio" name="plan" id="advanced" value="advanced" onClick={handleRadioChange} />
                  <Image
                    src="/assets/images/icon-advanced.svg"
                    height={40}
                    width={40}
                    alt='nothing'
                  />
                  <div className="radio-box-info">
                    <div className="radio-box-name">Advanced</div>
                    <div className="radio-box-detail">{price.advanced}</div>
                    {price.offer && <div className='offer'> {price.offer} </div>}
                  </div>
                </label>
                <label className="radio-input-box" htmlFor='pro'>
                  <input type="radio" name="plan" id="pro" value="pro" onClick={handleRadioChange} />
                  <Image
                    src="/assets/images/icon-pro.svg"
                    height={40}
                    width={40}
                    alt='nothing'
                  />
                  <div className="radio-box-info">
                    <div className="radio-box-name">Pro</div>
                    <div className="radio-box-detail">{price.pro}</div>
                    {price.offer && <div className='offer'> {price.offer} </div>}
                  </div>
                </label>
              </div>
              <div className="annual-plan-container">
                <div className={`monthly ${checked === "monthly" && "checked"}`}>Monthly</div>
                <label htmlFor="toggle" className='toggle'>
                  <div className="circle"></div>
                  <input type="checkbox" name="planDuration" id="toggle" ref={checkboxRef} onChange={handleCheckboxChange} />
                </label>
                <div className={`yearly ${checked === "yearly" && "checked"}`}>Yearly</div>
              </div>
            </form>
          </>
        )}
        {activeIndex === 3 && (
          <>
            <h1>Pick add-ons</h1>
            <p>Add ons help enhance your gaming experience.</p>
            <form className="step-3">
              <div className="checkbox-container">
                <label className='checkbox-input-box' htmlFor="online-service">
                  <input type="checkbox" name="addons" id="online-service" />
                  <Image
                    src="/assets/images/icon-checkmark.svg"
                    alt='check'
                    width={15}
                    height={15}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-name">Online Service</div>
                    <div className="checkbox-detail">Access to multiplayer games</div>
                  </div>
                  <div className="checkbox-price">
                    {planDetails.planDuration === "yearly" ? "+10$/yr" : "+$1/mo"}
                  </div>
                </label>
                <label className='checkbox-input-box' htmlFor="larger-storage">
                  <input type="checkbox" name="addons" id="larger-storage" />
                  <Image
                    src="/assets/images/icon-checkmark.svg"
                    alt='check'
                    width={15}
                    height={15}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-name">Larger Storage</div>
                    <div className="checkbox-detail">Extra 1TB of cloud save</div>
                  </div>
                  <div className="checkbox-price">
                    {planDetails.planDuration === "yearly" ? "+20$/yr" : "+$2/mo"}
                  </div>
                </label>
                <label className='checkbox-input-box' htmlFor="customize">
                  <input type="checkbox" name="addons" id="customize" />
                  <Image
                    src="/assets/images/icon-checkmark.svg"
                    alt='check'
                    width={15}
                    height={15}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-name">Customizable profile</div>
                    <div className="checkbox-detail">Custom theme on your profile</div>
                  </div>
                  <div className="checkbox-price">
                    {planDetails.planDuration === "yearly" ? "+20$/yr" : "+$2/mo"}
                  </div>
                </label>
              </div>
            </form>
          </>
        )}
        <div className="btn-container">
          {activeIndex !== 1 ? (
            <button className='btn back-btn' onClick={handleBackClick}>
              Go back
            </button>
          ) : (
            <div />
          )}
          {activeIndex !== 5 ? (<button className='btn next-step-btn' onClick={handleNextClick}>
            Next Step
          </button>) : (
            <button className='btn confirm-btn' onClick={handleSubmit}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
