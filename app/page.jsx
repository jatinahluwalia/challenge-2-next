"use client"

import Image from 'next/image'
import './page.css'
import { useState } from 'react'
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
    arcade: 9,
    advanced: 12,
    pro: 15,
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
  const [addonDetails, setAddonDetails] = useState([])
  const [total, setTotal] = useState(0)

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
        arcade: 90,
        advanced: 120,
        pro: 150,
        offer: "2 months free"
      })
      setPlanDetails({
        ...planDetails,
        planDuration: "yearly"
      })
    } else {
      setchecked("monthly")
      setPrice({
        arcade: 9,
        advanced: 12,
        pro: 15,
        offer: ""
      })
      setPlanDetails({
        ...planDetails,
        planDuration: "monthly"
      })
    }
  }
  const handleAddonChange = (e) => {
    if (e.target.checked) {
      setAddonDetails(prev => [...prev, {
        name: e.target.value.split("+")[0],
        price: parseInt(e.target.value.split("+")[1])
      }])
    } else {
      setAddonDetails(prev => prev.filter(item => item.name !== e.target.value.split("+")[0]))
    }

    setAddonDetails(prev => {
      console.log(prev);
      return prev
    })
  }

  const onChangeClick = () => {
    setActiveIndex(2)
    setAddonDetails([])
  }

  const handleBackClick = () => {
    if (activeIndex === 4) {
      setAddonDetails([])
    }
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

    if (activeIndex === 3) {
      setTotal(prev => {
        let temp = planDetails.price
        if (!addonDetails.length) return temp
        addonDetails.forEach(addon => {
          temp += addon.price
        })
        return temp
      })
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
                    <div className="radio-box-detail">{checked === "yearly" ? `$${price.arcade}/yr` : `$${price.arcade}/mo`}</div>
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
                    <div className="radio-box-detail">{checked === "yearly" ? `$${price.advanced}/yr` : `$${price.advanced}/mo`}</div>
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
                    <div className="radio-box-detail">{checked === "yearly" ? `$${price.pro}/yr` : `$${price.pro}/mo`}</div>
                    {price.offer && <div className='offer'> {price.offer} </div>}
                  </div>
                </label>
              </div>
              <div className="annual-plan-container">
                <div className={`monthly ${checked === "monthly" && "checked"}`}>Monthly</div>
                <label htmlFor="toggle" className='toggle'>
                  <div className="circle" style={checked === "yearly" ? { marginLeft: "20px" } : {}} />
                  <input type="checkbox" name="planDuration" id="toggle" onChange={handleCheckboxChange} />
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
                  <input value={checked === "yearly" ? `Online service+10` : `Online service+1`} type="checkbox" name="addons" id="online-service" onChange={handleAddonChange} />
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
                  <input value={checked === "yearly" ? `Larger storage+20` : `Larger storage+2`} type="checkbox" name="addons" id="larger-storage" onChange={handleAddonChange} />
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
                  <input value={checked === "yearly" ? `Customizable profile+20` : `Customizable profile+2`} type="checkbox" name="addons" id="customize" onChange={handleAddonChange} />
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
        {activeIndex === 4 && (
          <>
            <h1>Finishing up</h1>
            <p>Double-check everything looks OK before confirming.</p>

            <div className="summary-container">
              <div className="summary-plan-info-wrapper">
                <div className="summary-plan-info">
                  <div className="summary-plan-name">
                    {planDetails.plan.charAt(0).toUpperCase() + planDetails.plan.slice(1)} ({planDetails.planDuration.charAt(0).toUpperCase() + planDetails.planDuration.slice(1)})
                  </div>
                  <button className="btn change-btn" onClick={onChangeClick}>
                    Change
                  </button>
                </div>
                <div className="summary-plan-price">
                  {checked === "yearly" ? `$${planDetails.price}/yr` : `$${planDetails.price}/mo`}
                </div>
              </div>
              {addonDetails.length > 0 && (
                <div className="addon-container">
                  {addonDetails.map((addon) => (
                    <div className="addon" key={addon.name}>
                      <div className="addon-name">
                        {addon.name}
                      </div>
                      <div className="addon-price">
                        {checked === "yearly" ? `+$${addon.price}/yr` : `+$${addon.price}/mo`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="summary-total-container">
              <div className="summary-total-text">Total (per {planDetails.planDuration.replace("ly", "")})</div>
              <div className="summary-total">${total}/{planDetails.planDuration === "yearly" ? "yr" : "mo"}</div>
            </div>
          </>
        )}
        {activeIndex === 5 && (
          <div className="confirmation-container">
            <Image
              src="/assets/images/icon-thank-you.svg"
              alt='thank you'
              height={90}
              width={90}
            />
            <h1>Thank you!</h1>
            <p className='text-center'>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loregaming.com</p>
          </div>
        )}
        <div className="btn-container">
          {activeIndex !== 1 && activeIndex !== 5 ? (
            <button className='btn back-btn' onClick={handleBackClick}>
              Go back
            </button>
          ) : (
            <div />
          )}
          {activeIndex <= 4 ? (<button className='btn next-step-btn' onClick={handleNextClick}>
            Next Step
          </button>) : (
            activeIndex < 4 && <button className='btn confirm-btn' onClick={handleSubmit}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
