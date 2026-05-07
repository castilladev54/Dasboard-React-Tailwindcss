import { useState, useRef, useEffect, useMemo } from "react";
import { useSaleStore } from "../store/saleStore";

export const DATE_FILTER_OPTIONS = [
  { value: "all",    label: "Todas"    },
  { value: "today",  label: "Hoy"      },
  { value: "ayer",   label: "Ayer"     },
  { value: "7days",  label: "7 días"   },
  { value: "30days", label: "30 días"  },
  { value: "month",  label: "Este mes" },
];

export function useSalesFilters() {
  const { sales, pagination, fetchSales } = useSaleStore();

  const [dateFilter, setDateFilter]           = useState("all");
  const [dateFrom,   setDateFrom]             = useState("");
  const [dateTo,     setDateTo]               = useState("");
  const [sellerFilter, setSellerFilter]       = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentPage, setCurrentPage]         = useState(1);
  const datePickerRef = useRef(null);

  // Re-fetch cuando cambian los filtros o la página
  useEffect(() => {
    if (dateFilter === "custom" && (!dateFrom || !dateTo)) return;
    fetchSales(currentPage, 20, sellerFilter, dateFilter, dateFrom || undefined, dateTo || undefined);
  }, [fetchSales, currentPage, sellerFilter, dateFilter, dateFrom, dateTo]);

  // Cierra el datepicker al hacer clic fuera
  useEffect(() => {
    const handleOutside = (e) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target))
        setIsDatePickerOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const activeDateLabel = useMemo(() => {
    if (dateFilter === "custom" && dateFrom && dateTo) {
      const fmt = (d) => new Date(d + "T00:00:00").toLocaleDateString("es-VE", {
        day: "2-digit", month: "2-digit", year: "numeric",
      });
      return `${fmt(dateFrom)} – ${fmt(dateTo)}`;
    }
    return DATE_FILTER_OPTIONS.find((o) => o.value === dateFilter)?.label || "Todas";
  }, [dateFilter, dateFrom, dateTo]);

  const filteredTotal = useMemo(() => {
    const pageTotal = sales.reduce((a, s) => a + Number(s.total_amount || 0), 0);
    return Number(pagination?.totalAmount ?? pageTotal);
  }, [sales, pagination]);

  const totalPages = pagination?.totalPages || 1;

  return {
    dateFilter, setDateFilter,
    dateFrom,   setDateFrom,
    dateTo,     setDateTo,
    sellerFilter, setSellerFilter,
    isDatePickerOpen, setIsDatePickerOpen,
    currentPage, setCurrentPage,
    datePickerRef,
    activeDateLabel,
    filteredTotal,
    totalPages,
    DATE_FILTER_OPTIONS,
  };
}
