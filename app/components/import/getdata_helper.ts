export interface TableMap {
  sheet: string;
  api_plural: string;
  api_singular: string;
}

export const tableList = ref<TableMap[]>([
  { sheet: 'ADJUST', api_plural: 'atb-info-adjusts', api_singular: 'atb-info-adjust' },
  { sheet: 'AE', api_plural: 'atb-info-aes', api_singular: 'atb-info-ae' },
  { sheet: 'ALERT', api_plural: 'atb-info-alerts', api_singular: 'atb-info-alert' },
  { sheet: 'DD', api_plural: 'atb-info-ddis', api_singular: 'atb-info-ddi' },
  { sheet: 'MSDCPG', api_plural: 'msd-cpgs', api_singular: 'msd-cpg' },
  { sheet: 'Ref_FREQ', api_plural: 'ref-freqs', api_singular: 'ref-freq' },
  { sheet: '5_TabATB_CATALOG Final', api_plural: 'tab-atp-catalogs', api_singular: 'tab-atp-catalog' },
]);

export const sanitizeMsdCpg = (msd_cpg: any) => {
    const sanitized: Record<string, any> = {};
    if (typeof msd_cpg === 'object' && msd_cpg !== null) {
       for (const key in msd_cpg) {
          if (Object.prototype.hasOwnProperty.call(msd_cpg, key)) {
            const trimmedKey = key.trim();
            sanitized[trimmedKey] = msd_cpg[key] != null ? String(msd_cpg[key]) : "";
          }
        }
        delete sanitized['DOSE_CHECK'];
        delete sanitized['DOSE_M_CHECK'];
        delete sanitized['id']
        return sanitized;
    }
    return msd_cpg;
}