module.exports = {
  inicio: (req,res)=>{
    res.render('index-appbulance',
    {pageTitle:'Appbulance - Sitio Oficial'})
  },
  faq: (req,res)=>{
    res.render('index-appbulance-faq',
    {pageTitle:'Appbulance - Preguntas frecuentes'})
  },
  web_version: (req,res)=>{
    res.render('index-appbulance-web',
    {pageTitle:'Appbulance - Version web'})
  }
}