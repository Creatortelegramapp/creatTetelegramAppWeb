

export default function CampaignCountDown({
  className,
  counterbg,
}) {

  return (
    <div>
      <div className={`w-full lg:h-[460px] ${className || ""}`}>
        <div className="container-x mx-auto h-full">
          <div className="lg:flex xl:space-x-[30px] lg:space-x-5 items-center h-full">
            <div
              data-aos="fade-right"
              className="campaign-countdown lg:w-1/2 h-full w-full mb-5 lg:mb-0"
              style={{
                background: `url(${
                  import.meta.env.VITE_PUBLIC_URL
                }/assets/images/qr.png) no-repeat`,
                backgroundSize: "cover",
              }}
            >

            </div>
            <div
              data-aos="fade-left"
              className="download-app flex-1 lg:h-full h-[430px] xl:p-12 p-5"
              style={{
                background: `url(${
                  counterbg ||
                  `${
                    import.meta.env.VITE_PUBLIC_URL
                  }/assets/images/download-app-cover.png`
                }) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div className="flex flex-col h-full justify-between"
              style={{background: `url(${
                    counterbg ||
                    `${
                        import.meta.env.VITE_PUBLIC_URL
                    }/assets/images/telegram.png`
                }) no-repeat`,
                backgroundSize: "cover",
              }}>

                <div className="get-app">
                  <p className="text-[13px] font-600 text-qblack mb-3">
                    TELEGRAM հավելվածի տարբերակ
                  </p>
                  <h1 className="text-[30px] font-600 text-qblack leading-10 mb-8">
                    Ստացեք մեր
                    <span className="text-qred border-b-2 border-qred mx-2">
                        Telegram հավելվածը
                    </span>
                    <br /> Դա հեշտացնում է ձեր կյանքը:
                  </h1>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
