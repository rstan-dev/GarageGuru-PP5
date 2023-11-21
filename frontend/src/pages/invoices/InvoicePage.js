import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from "../../api/axiosDefaults";
import InvoiceCard from './InvoiceCard';

function InvoicePage() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({ results: []})

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: invoice }] = await Promise.all([
              axiosReq.get(`/invoices/${id}`),
            ]);
            setInvoice({ results: [invoice] });
            console.log(invoice)
          } catch (err) {
            console.log(err);
          }
        };

        handleMount();
      }, [id]);

    return (
    <>
    <div>Invoice Page</div>
    < InvoiceCard
    {...invoice.results[0]}/>
    </>
  )
}

export default InvoicePage