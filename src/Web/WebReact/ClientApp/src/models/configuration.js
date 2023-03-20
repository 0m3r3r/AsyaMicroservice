export  class Configuration {
  constructor(
    identityUrl,
    purchaseUrl,
    signalrHubUrl,
    activateCampaignDetailFunction
  ) {
    this.identityUrl = identityUrl;
    this.purchaseUrl = purchaseUrl;
    this.signalrHubUrl = signalrHubUrl;
    this.activateCampaignDetailFunction = activateCampaignDetailFunction;
  }
}
