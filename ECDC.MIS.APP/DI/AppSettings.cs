using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECDC.MIS.APP.DI
{
    public class AppSettings
    {
        public string SiteTitle { get; set; }
        public string SiteVersionNumber { get; set; }
        public Uri ReportSiteUrl { get; set; }
        public Uri ReportServerUrl { get; set; }
        public string SmtpServer { get; set; }
        public string MisSupportEmail { get; set; }
        public Uri ProjectManagementUrl { get; set; }
        public string WebServiceUrl { get; set; }
        public string MIS4HostUrl { get; set; }
    }
}
