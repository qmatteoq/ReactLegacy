using Newtonsoft.Json.Linq;
using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.System;
using Windows.UI.Core;

namespace Launcher
{
    public class LauncherModule : ReactContextNativeModuleBase
    {
        public override string Name
        {
            get
            {
                return "LauncherModule";
            }
        }

        public LauncherModule(ReactContext reactContext) : base(reactContext)
        {

        }

        [ReactMethod]
        public async void openUrl(JObject config, IPromise promise)
        {
            var url = config.Value<string>("url");
            if (string.IsNullOrEmpty(url))
            {
                promise.Reject(new ArgumentNullException(nameof(url)));
                return;
            }

            var uri = default(Uri);
            if (!Uri.TryCreate(url, UriKind.Absolute, out uri))
            {
                promise.Reject(new ArgumentException($"URL argument '{uri}' is not valid."));
                return;
            }


            try
            {
                Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, async () =>
                {
                    var outcome = await Windows.System.Launcher.LaunchUriAsync(uri);
                    promise.Resolve(outcome);
                });
            }
            catch (Exception exc)
            {
                promise.Reject(new InvalidOperationException($"Could not check if URL '{url}' can be opened.", exc));
            }
        }
    }
}
