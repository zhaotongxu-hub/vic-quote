import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Printer, FileText } from "lucide-react";

const texts = {
  zh: {
    pageTitle: "VIC 报价单生成器",
    subTitle: "输入信息后可直接生成中 / 英 / 法报价单页面，并支持打印另存为 PDF",
    language: "语言",
    basicInfo: "基础信息",
    companyInfo: "客户信息",
    itinerary: "行程内容",
    included: "包含项目",
    excluded: "不包含项目",
    preview: "报价单预览",
    print: "打印 / 导出 PDF",
    addItem: "新增一项",
    quotationNo: "报价编号",
    date: "日期",
    title: "标题",
    clientName: "客户名称",
    clientAddress: "客户地址",
    period: "服务期间",
    vehicleType: "车型",
    pax: "人数",
    totalPrice: "总价",
    currency: "货币",
    serviceStart: "服务开始说明",
    itemLabel: "项目",
    priceLabel: "价格",
    includedLabel: "包含：",
    excludedLabel: "不包含：",
    dailyItinerary: "每日行程",
    total: "总价",
    offert: "报价",
    footerCompany: "VIC TRANSPORT PARIS",
    footerAddress: "48 Chemin de Groslay 93140 Bondy",
    footerCopyright: "Copyright © 2024 VIC TRANSPORT PARIS. Tous les produits, vidéos, contenus visuels, articles et logos nous appartiennent.",
    notes: "备注",
    companyName: "公司名称",
    generateHint: "这个页面可作为网站里的一个独立链接，客户或同事填写后即可生成标准报价单。"
  },
  en: {
    pageTitle: "VIC Quote Generator",
    subTitle: "Enter details to generate a quotation in Chinese / English / French, then print or save as PDF.",
    language: "Language",
    basicInfo: "Basic Information",
    companyInfo: "Client Information",
    itinerary: "Itinerary",
    included: "Included Items",
    excluded: "Not Included",
    preview: "Quotation Preview",
    print: "Print / Export PDF",
    addItem: "Add item",
    quotationNo: "Quotation No.",
    date: "Date",
    title: "Title",
    clientName: "Client Name",
    clientAddress: "Client Address",
    period: "Period",
    vehicleType: "Vehicle Type",
    pax: "PAX",
    totalPrice: "Total Price",
    currency: "Currency",
    serviceStart: "Service start note",
    itemLabel: "Item",
    priceLabel: "Price",
    includedLabel: "Included:",
    excludedLabel: "Not included:",
    dailyItinerary: "Daily Itinerary",
    total: "TOTAL PRICE",
    offert: "QUOTATION",
    footerCompany: "VIC TRANSPORT PARIS",
    footerAddress: "48 Chemin de Groslay 93140 Bondy",
    footerCopyright: "Copyright © 2024 VIC TRANSPORT PARIS. All products, videos, visual content, articles, and logos belong to us.",
    notes: "Notes",
    companyName: "Company Name",
    generateHint: "This page can be used as a standalone website link so staff or clients can fill in data and generate a standard quotation." 
  },
  fr: {
    pageTitle: "Générateur de devis VIC",
    subTitle: "Saisissez les informations pour générer un devis en chinois / anglais / français, puis imprimez-le en PDF.",
    language: "Langue",
    basicInfo: "Informations générales",
    companyInfo: "Informations client",
    itinerary: "Programme",
    included: "Inclus",
    excluded: "Non inclus",
    preview: "Aperçu du devis",
    print: "Imprimer / Exporter en PDF",
    addItem: "Ajouter un élément",
    quotationNo: "N° de devis",
    date: "Date",
    title: "Titre",
    clientName: "Nom du client",
    clientAddress: "Adresse du client",
    period: "Période",
    vehicleType: "Type de véhicule",
    pax: "PAX",
    totalPrice: "Prix total",
    currency: "Devise",
    serviceStart: "Note de début de service",
    itemLabel: "Élément",
    priceLabel: "Prix",
    includedLabel: "Inclus :",
    excludedLabel: "Non inclus :",
    dailyItinerary: "Programme quotidien",
    total: "PRIX TOTAL",
    offert: "DEVIS",
    footerCompany: "VIC TRANSPORT PARIS",
    footerAddress: "48 Chemin de Groslay 93140 Bondy",
    footerCopyright: "Copyright © 2024 VIC TRANSPORT PARIS. Tous les produits, vidéos, contenus visuels, articles et logos nous appartiennent.",
    notes: "Remarques",
    companyName: "Nom de l'entreprise",
    generateHint: "Cette page peut être intégrée au site comme un lien autonome pour permettre aux équipes ou aux clients de générer un devis standard." 
  },
};

const optionCatalog = [
  "Professional English speaking driver",
  "Complete vehicle insurance",
  "Service 11h/day",
  "Extra hours: 80 € / h / coach",
  "Tips: 2 € × 3 days × 20 passengers = 120 €",
  "Paid directly to the driver",
  "Driver accommodation",
  "Driver's meal: 20 € × 5 = 100 €",
  "Parking fees",
  "Road tolls",
  "City access / ZTL",
  "Hotel for driver",
  "Meet & greet sign",
  "Drinks on board",
];

const initialData = {
  coachQty: "1",
  coachSeats: "45-55",
  sprinterQty: "",
  sprinterSeats: "19",

  quotationNo: "ZX29032604",
  date: "29/03/2026",
  title: "1 COACH 44-48 PLACES",
  clientName: "CFA Voyage",
  clientAddress: "13 Rue des Frères d'Astier de la Vigeries 75013 France",
  period: "04 April 2026 - 06 April 2026",
  vehicleType: "Coach 44 - 48 places",
  pax: "20+1",
  totalPrice: "Offert",
  currency: "EUR",
  serviceStart: "Begin of the service: [17:30 9-11 Avenue de Choisy, 75013 Paris, France]",
  notes: "",
  itinerary: [
    { left: "04/04/2026 Paris – Clermont-Ferrand", right: "Offert" },
    { left: "D2 – 05/04/2026 Puy de Dôme - Royatonic", right: "Offert" },
    { left: "D3 – 06/04/2026 Hotel – Blois – Cheverny – Paris", right: "Offert" },
  ],
  optionStates: {
    "Professional English speaking driver": "included",
    "Complete vehicle insurance": "included",
    "Service 11h/day": "included",
    "Extra hours: 80 € / h / coach": "excluded",
    "Tips: 2 € × 3 days × 20 passengers = 120 €": "excluded",
    "Paid directly to the driver": "excluded",
    "Driver accommodation": "excluded",
    "Driver's meal: 20 € × 5 = 100 €": "excluded",
    "Parking fees": "none",
    "Road tolls": "none",
    "City access / ZTL": "none",
    "Hotel for driver": "none",
    "Meet & greet sign": "none",
    "Drinks on board": "none",
  },
};


function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
    </div>
  );
}

export default function VicQuoteGenerator() {
  const [lang, setLang] = useState("en");
  const t = texts[lang];
  const [data, setData] = useState(initialData);

  const updateField = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  const setOptionState = (item, state) => {
    setData((prev) => ({
      ...prev,
      optionStates: {
        ...prev.optionStates,
        [item]: prev.optionStates[item] === state ? "none" : state,
      },
    }));
  };

  const includedItems = optionCatalog.filter((item) => data.optionStates[item] === "included");
  const excludedItems = optionCatalog.filter((item) => data.optionStates[item] === "excluded");

  const updateItinerary = (index, key, value) => {
    setData((prev) => {
      const next = [...prev.itinerary];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, itinerary: next };
    });
  };

  const addItinerary = () => {
    setData((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, { left: "", right: "" }],
    }));
  };

  const removeItinerary = (index) => {
    setData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const pageTitle = useMemo(() => {
    const parts = [];
    if (data.coachQty) parts.push(`${data.coachQty} COACH ${data.coachSeats} SEATS`);
    if (data.sprinterQty) parts.push(`${data.sprinterQty} SPRINTER ${data.sprinterSeats} SEATS`);
    return parts.length ? parts.join(" + ") : (data.title || t.offert);
  }, [data.coachQty, data.coachSeats, data.sprinterQty, data.sprinterSeats, data.title, t.offert]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 print:bg-white print:p-0">
      <style>{`
        @media print {
          body { background: white; }
          .no-print { display: none !important; }
          .print-area { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl grid grid-cols-1 xl:grid-cols-5 gap-6 print:block">
        <div className="xl:col-span-2 no-print space-y-6">
          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-2xl">{t.pageTitle}</CardTitle>
              <p className="text-sm text-slate-500">{t.subTitle}</p>
              <p className="text-xs text-slate-400">{t.generateHint}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <Label>{t.language}</Label>
                <Tabs value={lang} onValueChange={setLang} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="zh">中文</TabsTrigger>
                    <TabsTrigger value="en">EN</TabsTrigger>
                    <TabsTrigger value="fr">FR</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <Button onClick={() => window.print()} className="w-full rounded-xl gap-2">
                <Printer className="w-4 h-4" /> {t.print}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader><CardTitle>{t.basicInfo}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label={t.quotationNo}><Input value={data.quotationNo} onChange={(e) => updateField("quotationNo", e.target.value)} /></Field>
              <Field label={t.date}><Input value={data.date} onChange={(e) => updateField("date", e.target.value)} /></Field>
              <Field label={t.title}><Input value={data.title} onChange={(e) => updateField("title", e.target.value)} /></Field>
              <Field label={t.period}><Input value={data.period} onChange={(e) => updateField("period", e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Coach Qty"><Input value={data.coachQty} onChange={(e)=>updateField("coachQty", e.target.value)} /></Field>
                <Field label="Coach Seats"><Input value={data.coachSeats} onChange={(e)=>updateField("coachSeats", e.target.value)} /></Field>
                <Field label="Sprinter Qty"><Input value={data.sprinterQty} onChange={(e)=>updateField("sprinterQty", e.target.value)} /></Field>
                <Field label="Sprinter Seats"><Input value={data.sprinterSeats} onChange={(e)=>updateField("sprinterSeats", e.target.value)} /></Field>
              </div>
              <Field label={t.pax}><Input value={data.pax} onChange={(e) => updateField("pax", e.target.value)} /></Field>
              <Field label={t.totalPrice}><Input value={data.totalPrice} onChange={(e) => updateField("totalPrice", e.target.value)} /></Field>
              <Field label={t.currency}>
                <Select value={data.currency} onValueChange={(value) => updateField("currency", value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="CNY">CNY</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label={t.serviceStart}><Textarea value={data.serviceStart} onChange={(e) => updateField("serviceStart", e.target.value)} /></Field>
              <Field label={t.notes}><Textarea value={data.notes} onChange={(e) => updateField("notes", e.target.value)} /></Field>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader><CardTitle>{t.companyInfo}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label={t.clientName}><Input value={data.clientName} onChange={(e) => updateField("clientName", e.target.value)} /></Field>
              <Field label={t.clientAddress}><Textarea value={data.clientAddress} onChange={(e) => updateField("clientAddress", e.target.value)} /></Field>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t.itinerary}</CardTitle>
              <Button variant="outline" size="sm" onClick={addItinerary} className="gap-2 rounded-xl">
                <Plus className="w-4 h-4" /> {t.addItem}
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.itinerary.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-start">
                  <Input className="col-span-8" value={item.left} onChange={(e) => updateItinerary(index, "left", e.target.value)} placeholder={t.itemLabel} />
                  <Input className="col-span-3" value={item.right} onChange={(e) => updateItinerary(index, "right", e.target.value)} placeholder={t.priceLabel} />
                  <Button variant="ghost" size="icon" className="col-span-1" onClick={() => removeItinerary(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-0">
            <CardHeader>
              <CardTitle>Included / Not Included Options</CardTitle>
              <p className="text-sm text-slate-500">Each item can only have one active state: Included or Not Included. If Included is selected, it cannot also appear in Not Included.</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {optionCatalog.map((item) => {
                const state = data.optionStates[item] || "none";
                return (
                  <div key={item} className="grid grid-cols-12 gap-3 items-center border rounded-xl p-3">
                    <div className="col-span-6 text-sm text-slate-800">{item}</div>
                    <Button
                      type="button"
                      variant={state === "included" ? "default" : "outline"}
                      className="col-span-3 rounded-xl"
                      onClick={() => setOptionState(item, "included")}
                    >
                      Included
                    </Button>
                    <Button
                      type="button"
                      variant={state === "excluded" ? "default" : "outline"}
                      className="col-span-3 rounded-xl"
                      onClick={() => setOptionState(item, "excluded")}
                    >
                      Not Included
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-3 print:w-full">
          <div className="print-area mx-auto bg-white shadow-xl border border-slate-200 rounded-[28px] overflow-hidden aspect-[210/297] w-full max-w-[900px] p-8 md:p-12 relative text-black print:rounded-none print:shadow-none print:border-0 print:max-w-none">
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center text-[180px] font-serif tracking-widest select-none">
              VIC
            </div>

            <div className="relative h-full flex flex-col">
              <div className="grid grid-cols-2 gap-6 items-start">
                <div>
                  <div className="border border-slate-700 inline-block px-6 py-3">
                    <div className="text-7xl leading-none font-serif tracking-tight">VIC</div>
                    <div className="text-right text-lg tracking-tight">TRANSPORT</div>
                  </div>
                  <div className="mt-3 text-2xl tracking-[0.45em] font-light">- PARIS -</div>
                </div>

                <div className="text-right">
                  <div className="font-serif text-5xl">{t.offert}</div>
                  <div className="mt-4 text-3xl font-serif">{pageTitle}</div>
                  <div className="mt-4 text-lg">ND: {data.quotationNo}</div>
                  <div className="text-lg">DATE: {data.date}</div>
                  <div className="mt-4 text-xl">{data.clientName}</div>
                  <div className="text-lg whitespace-pre-line">{data.clientAddress}</div>
                </div>
              </div>

              <div className="mt-8 border-2 border-slate-200 rounded-[24px] p-8 relative overflow-hidden">
                <div className="space-y-1 text-lg">
                  <div>{t.period} : {data.period}</div>
                  <div>{t.vehicleType} : {data.vehicleType}</div>
                  <div>{t.pax} : {data.pax}</div>
                </div>

                <div className="mt-10 text-center font-serif text-4xl">{t.dailyItinerary}</div>

                <div className="mt-8 space-y-6 text-lg">
                  {data.serviceStart ? <div className="whitespace-pre-line">{data.serviceStart}</div> : null}
                  {data.itinerary.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-8 whitespace-pre-line">{item.left}</div>
                      <div className="col-span-2 border-b border-dotted border-slate-500 mt-4" />
                      <div className="col-span-2 text-right font-semibold">{item.right}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-10 text-lg">
                <div>
                  <div className="font-bold">{t.includedLabel}</div>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    {includedItems.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-bold">{t.excludedLabel}</div>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    {excludedItems.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <div className="font-serif text-4xl">{t.total}</div>
                </div>
                <div className="font-serif text-5xl">{data.totalPrice} {data.currency}</div>
              </div>

              {data.notes ? (
                <div className="mt-6 text-sm text-slate-700 border-t pt-4">
                  <span className="font-semibold">{t.notes}: </span>{data.notes}
                </div>
              ) : null}

              <div className="mt-auto pt-10 flex items-end gap-5 border-t border-slate-200">
                <div className="bg-black text-white px-4 py-3 rounded-lg min-w-[150px] text-center">
                  <div className="text-5xl font-serif leading-none">VIC</div>
                  <div className="text-xs tracking-[0.4em] mt-1">- PARIS -</div>
                </div>
                <div className="text-sm">
                  <div className="font-serif text-2xl">{t.footerCompany}</div>
                  <div className="mt-1">{t.footerAddress}</div>
                  <div className="mt-2 text-xs text-slate-600 max-w-[540px]">{t.footerCopyright}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="no-print flex items-center justify-center gap-2 mt-4 text-sm text-slate-500">
            <FileText className="w-4 h-4" /> A4 portrait layout, ready for browser print/PDF export
          </div>
        </div>
      </div>
    </div>
  );
}
